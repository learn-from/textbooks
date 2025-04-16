
const APP_KEY = 'AIzaSyBU3xYCOz2XoE5GceIGaXqzfgdEXD8TdcY';
const TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${APP_KEY}`;

document.addEventListener('DOMContentLoaded', initAudioPlayer);

function initAudioPlayer() {
	if (isDeskTop()) {
		document.addEventListener('mouseup', sayHighlighted);
		document.addEventListener('keyup', sayHighlighted);
		document.getElementById('audio-player').style.display = 'block';
	}
}

/**
 * Uses Google's text to speech service to say the specified text.
 */
async function talk(text) {
	let langCode = 'cmn-CN';
	let langName = 'cmn-TW-Wavenet-A'; // Mandarin Chinese , female

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
		const response = await fetch(TTS_URL, {
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
			audioPlayer.style.display = 'block';  // Show the audio player
		} else {
			console.error('Error:', data);
		}
	} catch (error) {
		console.error(error);
	}
}

/**
 * If some text is highlighted in article-text element, say it.
 */
function sayHighlighted() {
	let selection = window.getSelection();
	let selectedText = selection.toString();

	// Check if the selection is within the phrase or sentence element
	if (selectedText.length > 0) {
		let selectedElement = selection.anchorNode.parentNode;
		let article = document.getElementsByClassName('article-text')[0];

		if (selectedElement === article || article.contains(selectedElement)) {
			talk(selectedText);
		}
	}
}
