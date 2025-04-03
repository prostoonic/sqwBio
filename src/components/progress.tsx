// import React, { useState, useRef } from "react";
import "./../styles/styles.css";

// interface Iprops {
//     setCurrentTime: (currentTime: number) => void;
// }


// const DraggableProgressBar: React.FC = ({setCurrentTime}) => {
//   const [progress, setProgress] = useState(0); // Начальное значение 50%
//   const progressBarRef = useRef<HTMLDivElement>(null);

//   const handleMouseDown = (event: React.MouseEvent) => {
//     if (!progressBarRef.current) return;

//     const progressBar = progressBarRef.current;
//     const { left, width } = progressBar.getBoundingClientRect();

//     const updateProgress = (clientX: number) => {
//       let newProgress = ((clientX - left) / width) * 100;
//       newProgress = Math.max(0, Math.min(100, newProgress)); // Ограничение от 0 до 100
//       setCurrentTime(newProgress)
//       setProgress(newProgress);
//     };

//     updateProgress(event.clientX);

//     const handleMouseMove = (moveEvent: MouseEvent) => {
//       updateProgress(moveEvent.clientX);
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div className="music__progress-wrapper" ref={progressBarRef} onMouseDown={handleMouseDown}>
//       <div className="music__progress-inner" style={{ width: `${progress}%` }}></div>
//       <div className="music__progress-indicator" style={{ left: `${progress}%` }}></div>
//     </div>
//   );
// };

// export default DraggableProgressBar;

import React, { useState, useRef } from "react";
// import "./DraggableProgressBar.css";

interface IProps {
  setCurrentProgress: (currentProgress: number) => void;
  audio: HTMLAudioElement | null

}

const DraggableProgressBar: React.FC<IProps> = ({ setCurrentProgress , audio }) => {
  console.log('audio',audio)
  const [progress, setProgress] = useState(0); // Начальное значение 50%
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!progressBarRef.current) return;

    const progressBar = progressBarRef.current;
    const { left, width } = progressBar.getBoundingClientRect();

    const updateProgress = (clientX: number) => {
      let newProgress = ((clientX - left) / width) * 100;
      newProgress = Math.max(0, Math.min(100, newProgress)); // Ограничение от 0 до 100
      setProgress(newProgress);
      setCurrentProgress(newProgress);
      if(audio){
        audio.pause();
      }
       // Передача нового значения времени
    };

    updateProgress(event.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateProgress(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if(audio){
        audio.play();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="music__progress-wrapper" ref={progressBarRef} onMouseDown={handleMouseDown}>
      <div className="music__progress-inner" style={{ width: `${progress}%` }}></div>
      <div className="music__progress-indicator" style={{ left: `${progress}%` }}></div>
    </div>
  );
};

export default DraggableProgressBar;

