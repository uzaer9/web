import { useState, useEffect, useRef } from "react";

export default function App() {
  const [celebrated, setCelebrated] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [typedText, setTypedText] = useState("");
  const noButtonRef = useRef(null);
  const audioRef = useRef(null);

  const images = [
    "src/assets/IMG_0808.jpg",
    "src/assets/IMG-20231203-WA0003-01.jpeg",
    "src/assets/IMG-20250224-WA0047.jpg",
  ];

  const loveLetter =
    "From the moment I met you, my world changed. You are my today, my tomorrow, and my forever. 💕 I promise to love you endlessly.";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (celebrated) {
      let i = 0;
      const typing = setInterval(() => {
        setTypedText(loveLetter.slice(0, i));
        i++;
        if (i > loveLetter.length) clearInterval(typing);
      }, 50);

      audioRef.current?.play();
      createCelebration();
    }
  }, [celebrated]);

  const handleNoHover = () => {
    if (!noButtonRef.current) return;
    const x = Math.random() * 400 - 200;
    const y = Math.random() * 300 - 150;
    noButtonRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const createCelebration = () => {
    const container = document.querySelector(".confetti-container");
    for (let i = 0; i < 150; i++) {
      const heart = document.createElement("div");
      heart.className = "confetti";
      heart.innerHTML = "💖";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = 2 + Math.random() * 2 + "s";
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }
  };

  return (
    <div className="app">
      {!celebrated && (
        <>
          <section className="hero">
            <h1>Will You Be My Valentine?</h1>
            <div className="carousel">
              <img src={images[currentImage]} alt="romantic" />
            </div>
            <div className="buttons">
              <button className="yes" onClick={() => setCelebrated(true)}>
                Yes 💕
              </button>
              <button
                className="no"
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
              >
                No
              </button>
            </div>
          </section>
        </>
      )}

      {celebrated && (
        <section className="celebration">
          <audio
            ref={audioRef}
            src="https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav"
            loop
          />
          <div className="confetti-container"></div>
          <h1 className="romantic-title">She Said YES! 💍</h1>
          <div className="celebration-carousel">
            <img src={images[currentImage]} alt="romantic" />
          </div>
          <p className="love-letter">{typedText}</p>
          <button
            className="restart"
            onClick={() => window.location.reload()}
          >
            Replay 💞
          </button>
        </section>
      )}
    </div>
  );
}
