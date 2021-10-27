import { useEffect, useRef } from "react";

export function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    (async () => {
      if (videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);
  return (
    <div className="App">
      <video autoPlay className="App__video" ref={videoRef} />
    </div>
  );
}
