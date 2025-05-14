
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
	static sayHighlighted() {
		const selection = window.getSelection();
		const selectedText = selection.toString();

		if (!selectedText) return;

		const speaker = Speaker.getInstance();
		speaker.openModal(selectedText);

		// Check if the selection is within the phrase or sentence element
		const selectedElement = selection.anchorNode?.parentNode;
		const article = document.getElementsByClassName('article-text')[0];

		if (selectedElement === article || article.contains(selectedElement)) {
			speaker.playAudio(selectedText);
		}
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
		speaker.openModal(text);
		speaker.recognizeSpeech(text);
	}

	/** 
	 * Gets speech from microphone and recognizes it to a text. 
	 * Recording time: 2.5 characters per second, 4 seconds minumum.
	 */
	async recognizeSpeech(text) {
		// const speaker = Speaker.getInstance();
		const waitTime = ((text.length < 3 ? 4 : text.length) / 2.5) * 1000;
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
				// Convert audio to Base64
				const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
				const base64Audio = await this.convertBlobToBase64(audioBlob);

				// Send audio to Google Speech-to-Text API
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
			this.showRecError("Error accessing microphone: " + error.errorText);
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
				this.showRecError("Speech-to-text error response:" + errorText);
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
				this.showRecError("No speech detected, try again and speak louder.");
			}
		} catch (error) {
			console.error("Error transcribing audio:", error);
			this.showRecError("Speech-to-text error transcribing audio:" + error.errorText);
		}
	}

	/** 
	 * Gets pinyins using Google's translator for comparing 
	 */
	async getPinyin(text, inputText) {
		const encodedText = encodeURIComponent(text);
		const encodedInputText = encodeURIComponent(inputText);
		const urlText = Speaker.TRANSLATER_URL + encodedText;
		const urlInputText = Speaker.TRANSLATER_URL + encodedInputText;

		const response = await fetch(urlText);
		const data = await response.json();
		const textPinyin = data[0].map(sentence => sentence[3]).join(" ");

		response = await fetch(urlInputText);
		data = await response.json();
		const inputTextPinyin = data[0].map(sentence => sentence[3]).join(" ");
		// console.log("pinyinText, pinyinInputText:[" + textPinyin + '], [' + inputTextPinyin + ']');

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
		// check tones
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

		// document.getElementById('recognization').style.display = 'block'
		document.getElementById('input-text').textContent = pinyin.inputText;
		document.getElementById('input-pinyin').textContent = pinyin.inputTextPinyin;
		document.getElementById('rec-error').textContent = '';
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
	openModal(selectedText) {
		let modal = document.getElementById("my-voice");
		let text = document.getElementById('highlighted-text');
		modal.style.display = "block";
		text.textContent = selectedText;
		document.getElementById('input-text').textContent = '语音识别（不太准确）';
		document.getElementById('input-pinyin').textContent = 'Yǔyīn shìbié';
		document.getElementById('rec-error').textContent = '';
	}

	/**
	 * Shows a greeting image accordingly.
	 */
	showGreetingImage(status) {
		let img = document.getElementById('recording');
		let image;
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
			default:
				image = 'voice-recognization.jpg';
				break;
		}
		img.src = 'images/sites/' + image;
	}
}

window.Speaker = Speaker;