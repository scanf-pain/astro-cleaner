import { useEffect, useState } from "react";

const useLoadOpenCV = () => {
  const [isCvLoaded, setIsCvLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadOpenCV = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById("opencv-js");

        if (!existingScript) {
          const script = document.createElement("script");
          script.id = "opencv-js";
          script.src = "https://docs.opencv.org/4.9.0/opencv.js";
          script.async = true;
          script.onload = () => {
            script.isLoaded = true;
            setIsCvLoaded(() => true);
            resolve();
          };
          script.onerror = () => {
            setIsError(true);
            reject(new Error("OpenCV.js failed to load"));
          };
          document.body.appendChild(script);
        } else {
          if (existingScript.isLoaded) {
            setIsCvLoaded(() => true);
            resolve();
          }
          resolve();
        }
      });
    };

    loadOpenCV().catch((err) => console.error(err));
  }, []);

  return { isCvLoaded, isError };
};

export default useLoadOpenCV;
