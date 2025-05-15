import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [fileName, setFileName] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.current.push(event.data);
    };
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      setFileName(`recording_${Date.now()}.webm`);
      audioChunks.current = [];
    };
    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  const uploadToGoogleDrive = async () => {
    if (!audioURL) return alert("No recording available.");

    const blob = await fetch(audioURL).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", blob, fileName);

    // Google Drive upload logic
    try {
      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <Card className="p-4 m-4 w-full">
      <CardContent className="space-y-4">
        <div className="space-x-2">
          {!isRecording ? (
            <Button onClick={startRecording}>Start Recording</Button>
          ) : (
            <Button onClick={stopRecording}>Stop Recording</Button>
          )}
        </div>
        {audioURL && (
          <>
            <audio controls src={audioURL} className="w-full"></audio>
            <Button onClick={uploadToGoogleDrive}>Upload to Google Drive</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
