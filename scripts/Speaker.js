
import { AppUtils } from './AppUtils.js';

export class Speaker {
	static APP_KEY = 'AIzaSyAc95QQS_JYEPg8EAa2bERiH4102aeekk0';
	static TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${Speaker.APP_KEY}`;
	static STT_URL = `https://speech.googleapis.com/v1/speech:recognize?key=${Speaker.APP_KEY}`;
	static TRANSLATER_URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&dt=rm&q=';



	constructor() {
	}

	/**
	 * Creates an instance of this class to implement the lazy singleton pattern
	 * @returns 
	 */
	static getInstance() {
		if (!Speaker._instance) {
			Speaker._instance = new Speaker();
		}
		return Speaker._instance;
	}

	/**
	 * If some text is highlighted in article-text element, say it.
	 */
	static sayHighlighted(event) {
		setTimeout(() => {
			const selectionLength = 65; // a user is able to highlight up to 65 Chinese characters (15 - 16 seconds)
			const selection = window.getSelection();
			const selectedText = selection.toString().trim();
			const message = 'handling ' + event.type + ', the selected text: ' + selectedText;
			console.log(message);

			if (selectedText && selectedText.length < selectionLength && selectedText.length > 1) {
				const speaker = Speaker.getInstance();
				speaker.openModal(selectedText, 'init');
				speaker.playAudio(selectedText);
			}

			AppUtils.sendEmail(message);
		}, 20);
	}

	/**
	 * Uses Google's text to speech service to say the specified text.
	 */
	async playAudio(text) {
		const langCode = 'cmn-CN';
		const langName = 'cmn-TW-Wavenet-A'; // Mandarin Chinese , female

		const requestBody = {
			input: {
				text: text
			},
			voice: {
				languageCode: langCode,
				name: langName
			},
			audioConfig: {
				audioEncoding: 'MP3',
				speakingRate: 1.0
			}
		};

		try {
			const response = await fetch(Speaker.TTS_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				return response.statusText;
			}

			const data = await response.json();
			const audioContent = data.audioContent;
			if (audioContent) {
				// Set the audio content to the player
				const audioPlayer = document.getElementById('text-reader');
				audioPlayer.src = `data:audio/mp3;base64,${audioContent}`;
			} else {
				console.error('Error:', data);
			}
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Gets voice from a microphone, converts it to a text, gets pinyins of both
	 * input text and the selected text, and finally checks if they are same. This is
	 * used to practice pronunciation.
	 */
	static async speechCheck() {
		const speaker = Speaker.getInstance();
		const tag = document.getElementById('highlighted-text');
		const text = tag.textContent;
		speaker.openModal(text, 'record');
		speaker.recognizeSpeech(text);
	}

	/** 
	 * Gets speech from microphone and recognizes it to a text. 
	 * Recording time: 3 characters per second, 4 seconds minumum.
	 */
	async recognizeSpeech(text) {
		const speaker = Speaker.getInstance();
		const waitTime = (text.length < 9 ? 4 : (text.length / 3)) * 1000;

		try {
			// Get microphone access
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

			// Create MediaRecorder to capture audio
			const mediaRecorder = new MediaRecorder(stream);
			const audioChunks = [];

			mediaRecorder.ondataavailable = (event) => {
				audioChunks.push(event.data);
			};

			mediaRecorder.onstop = async () => {
				// Create an audio blob for saving to a file (only audio/webm works now)
				const webmBlob = new Blob(audioChunks, { type: 'audio/webm' });
				console.log("Blob size:", webmBlob.size, "type:", webmBlob.type, "rec time:", waitTime/1000);

				// play the recorded voice and make it downloadable in mp3 format
				speaker.playRecordedVoice(webmBlob);

				// Convert audio to Base64 to send the audio clip to Google Speech-to-Text API
				const base64Audio = await this.convertBlobToBase64(webmBlob);
				this.transcribeAudio(text, base64Audio);
			};

			// Start recording
			mediaRecorder.start();
			// console.log("Recording started...");

			// Stop recording after waitTime seconds
			setTimeout(() => {
				mediaRecorder.stop();
				// console.log("Recording stopped.");
			}, waitTime);
		} catch (error) {
			console.error("Error accessing microphone:", error);
			this.showError("Error accessing microphone: " + error.errorText);
		}
	}

	/**
	 * Plays the recorded voice (webm format) and make it downloadable in mp3 format.
	 * Converts it to mp3 as Safari browser of iOS version doesn't play webm well.
	 * @param {*} webmBlob 
	 */
	async playRecordedVoice(webmBlob) {
		// Create AudioContext to decode WebM
		console.log('Converting to MP3...');
		let audioContext = null;
		try {
			audioContext = new AudioContext();
			const arrayBuffer = await webmBlob.arrayBuffer();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

			// Get PCM data (mono or stereo)
			const channelData = audioBuffer.getChannelData(0); // Use first channel (mono)
			const sampleRate = audioBuffer.sampleRate;

			// Convert to 16-bit PCM for lamejs
			const samples = new Int16Array(channelData.length);
			for (let i = 0; i < channelData.length; i++) {
				samples[i] = Math.max(-1, Math.min(1, channelData[i])) * 32767;
			}

			// Encode to MP3 using lamejs
			const mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, 128); // Mono, 128kbps
			const mp3Data = [];
			const blockSize = 1152; // MP3 frame size
			for (let i = 0; i < samples.length; i += blockSize) {
				const sampleChunk = samples.subarray(i, i + blockSize);
				const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
				if (mp3buf.length > 0) {
					mp3Data.push(mp3buf);
				}
			}
			const mp3buf = mp3Encoder.flush();
			if (mp3buf.length > 0) {
				mp3Data.push(mp3buf);
			}

			// Create MP3 Blob and play the recorded voice
			const mp3Blob = new Blob(mp3Data, { type: 'audio/mpeg' });
			const mp3Url = URL.createObjectURL(mp3Blob);
			let player = document.getElementById('record-reader');
			player.src = mp3Url;

			// create a "save" button
			const today = new Date();
			const now = '_' + (today.getMonth() + 1) + '_' + today.getDate() + '_' + today.getHours() + '_' + today.getMinutes();
			const downloadLink = document.createElement('a');
			downloadLink.href = mp3Url;
			downloadLink.download = 'recording' + now + '.mp3';
			downloadLink.title = 'Download the recorded voice';
			downloadLink.innerHTML = '<i class="fa-solid fa-download"></i>';
			let audioLink = document.getElementById('audio-link');
			audioLink.innerHTML = '';
			audioLink.appendChild(downloadLink);
		} catch (error) {
			console.log('Error converting to MP3: ', error.message);
		} finally {
			if (audioContext && audioContext.state !== 'closed') {
				audioContext.close().catch((error) => {
					console.error('Error closing AudioContext:', error);
				});
			}
		}
	}

	/**
	 * Converts Blob (audio file) to Base64
	 */
	convertBlobToBase64(blob) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract Base64
			reader.readAsDataURL(blob);
		});
	}

	/**
	 * Sends Base64 audio to Google Speech-to-Text API
	 */
	async transcribeAudio(text, base64Audio) {
		// console.log("Base64 Audio (First 100 chars):", base64Audio.substring(0, 100));
		const requestBody = {
			config: {
				"encoding": "WEBM_OPUS",
				"sampleRateHertz": 48000,
				languageCode: "zh-CN",
				speechContexts: [
					{
						phrases: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
						boost: 20.0
					}
				]
			},
			audio: {
				content: base64Audio,
			},
		};

		try {
			const response = await fetch(Speaker.STT_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody),
			})
			// .then(response => response.json())
			// // .then(data => console.log("API Response:", data))
			// .catch(error => console.error("Fetch Error:", error));

			if (!response.ok) {
				// Get raw response for debugging
				const errorText = await response.text();
				console.error("Speech-to-text error response:", errorText);
				this.showError("Speech-to-text error response:" + errorText);
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			// console.log("Speech to text result:", data);

			if (data.results) {
				const inputText = data.results.map(result => result.alternatives[0].transcript).join(" ");
				// console.log("Recognized Speech: " + inputText);
				this.getPinyin(text, inputText);
			} else {
				console.error("No speech detected!");
				this.showError("No speech detected, try again and speak louder.");
			}
		} catch (error) {
			console.error("Error transcribing audio:", error);
			this.showError("Speech-to-text error transcribing audio:" + error.errorText);
		}
	}

	/** 
	 * Gets pinyins using Google's translator for comparing 
	 */
	async getPinyin(text, inputText) {
		// console.log("text, recognized text:", text, inputText);
		const encodedText = encodeURIComponent(text);
		const encodedInputText = encodeURIComponent(inputText);
		let urlText = Speaker.TRANSLATER_URL + encodedText;
		let urlInputText = Speaker.TRANSLATER_URL + encodedInputText;

		let response = await fetch(urlText);
		let data = await response.json();
		let textPinyin = data[0].map(sentence => sentence[3]).join(" ");

		response = await fetch(urlInputText);
		data = await response.json();
		const inputTextPinyin = data[0].map(sentence => sentence[3]).join(" ");
		// console.log("pinyin, recognized pinyin:", textPinyin, inputTextPinyin);

		const pinyin = {
			'text': text,
			'textPinyin': textPinyin.trim(),
			'inputText': inputText,
			'inputTextPinyin': inputTextPinyin.trim(),
		}
		this.checkPinyin(pinyin);
	}

	/**
	 * Checks if the pinyins of two texts are same.
	 * Exactly same or there are some wrong tones.
	 */
	checkPinyin(pinyin) {

		const textPinyin = this.removePuntuciation(pinyin.textPinyin);
		const inputTextPinyin = this.removePuntuciation(pinyin.inputTextPinyin);
		const textPinyinToneless = this.removeTones(textPinyin);
		const inputTextPinyinToneless = this.removeTones(inputTextPinyin);
		let status;

		if (textPinyin.localeCompare(inputTextPinyin, undefined, { sensitivity: 'accent' }) === 0) {
			status = 'good';
		} else if (textPinyinToneless.localeCompare(inputTextPinyinToneless, undefined, { sensitivity: 'accent' }) === 0) {
			status = 'okay';
		} else {
			status = 'wrong';
		}
		this.showGreetingImage(status);

		document.getElementById('download').style.display = 'block'
		document.getElementById('input-text').textContent = pinyin.inputText;
		document.getElementById('input-pinyin').textContent = pinyin.inputTextPinyin;
		document.getElementById('voice-error').textContent = '';
	}

	/**
	 * Removes tones from a pinyin string.
	 * @param pinyin 
	 * @returns 
	 */
	removeTones(pinyin) {
		return pinyin
			.normalize("NFD") // Normalize Unicode
			.replace(/[\u0300-\u036f]/g, "");
	}

	/**
	 * Removes all the puntuciation marks (English, Chinese and spaces)
	 */
	removePuntuciation(text) {
		let chars = text.trim();
		let starter = chars.substring(0, 3);
		if (starter.localeCompare('Hēi', undefined, { sensitivity: 'base' }) === 0) {
			chars = chars.substring(3);
		}
		chars = chars.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()?"'<>[\]\\]/g, "");
		chars = chars.replace(/[，。；：？‘’“”！【】]/g, "");
		return chars;
	}

	/**
	 * Opens a Modal element as a pop-up window to play audio and recgnize voice.
	 * @param {} selectedText 
	 */
	openModal(selectedText, status) {
		let modal = document.getElementById("my-voice");
		let text = document.getElementById('highlighted-text');
		modal.style.display = "block";
		text.textContent = selectedText;
		document.getElementById('input-text').textContent = '语音识别（不太准确）';
		document.getElementById('input-pinyin').textContent = 'Yǔyīn shìbié';
		document.getElementById('voice-error').textContent = '';
		document.getElementById('timestamp').textContent = '';
		document.getElementById('download').style.display = 'none';
		this.showGreetingImage(status);
	}

	/**
	 * Shows a greeting image accordingly.
	 */
	showGreetingImage(status) {
		let img = document.getElementById('recording');
		let image;
		let showTime = true;
		switch (status) {
			case 'good':
				image = 'two-thumbs-up.jpg';
				break;
			case 'wrong':
				image = 'try-again.jpg';
				break;
			case 'okay':
				image = 'okay.jpg';
				break;
			case 'record':
				image = 'recording.jpg';
				showTime = false;
				break;
			default:
				image = 'voice-recognization.jpg';
				showTime = false;
				break;
		}
		img.src = 'images/sites/' + image;

		if (showTime) {
			const today = new Date();
			const now = (today.getMonth() + 1) + '/' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
			let time = document.getElementById('timestamp');
			time.textContent = now;
		}
	}

	showError(message) {
		let error = document.getElementById('voice-error');
		if (message == null || message.length == 0) {
			error.style.display = 'none';
		} else {
			error.style.display = 'block';
		}
		error.textContent = message;
	}
}

window.Speaker = Speaker;