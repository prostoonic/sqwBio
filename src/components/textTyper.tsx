import { useState, useEffect } from "react";

export default function TextAnimator() {
    const text = "lorem ipsum dolor"
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [removing, setRemoving] = useState(false);

    useEffect(() => {
        if (!removing) {
            if (index < text.length) {
                const addLetter = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
                }, 80);
                return () => clearTimeout(addLetter);
            } else {
                setTimeout(() => setRemoving(true), 1100);
            }
            } else {
            if (index > 0) {
                const removeLetter = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
                setIndex((prev) => prev - 1);
                }, 80);
                return () => clearTimeout(removeLetter);
            } else {
                setTimeout(() => setRemoving(false), 500);
            }
        }
    }, [index, removing, text]);

  return <div className="text-typer">{displayText}</div>;
}