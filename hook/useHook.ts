
import { useState, useEffect } from "react";

export function useProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startLoading = () => {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : prev)); // 90'a kadar artır
      }, 500);
    };

    const stopLoading = () => {
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Kısa bir gecikme ile sıfırla
      clearInterval(interval);
    };

    startLoading();

    return () => stopLoading();
  }, []);

  return progress;
}
