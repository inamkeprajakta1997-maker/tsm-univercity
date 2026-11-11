import { useEffect, useState } from "react";

const SESSION_KEY = "tsm-opening-intro-v1";

export function OpeningIntro({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) onComplete?.();
  }, [visible, onComplete]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "seen";
    } catch {
      /* Storage may be unavailable. */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, "seen");
    } catch {
      /* The intro still has a fixed time limit. */
    }
    const timer = window.setTimeout(() => setVisible(false), 1700);
    const skip = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="opening-intro"
      data-opening-intro
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === "intro-curtain-out")
          setVisible(false);
      }}
    >
      <button
        className="opening-intro-skip"
        onClick={() => setVisible(false)}
        aria-label="Skip introduction"
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
      <div className="opening-intro-art" aria-hidden="true">
        <svg viewBox="0 0 280 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g
            className="intro-drawing"
            stroke="#195c90"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path pathLength={1} d="M45 171h190" stroke="#dce7ef" />
            <path pathLength={1} d="M87 52c-9 0-15 7-15 16s6 17 15 17 15-8 15-17-6-16-15-16Z" />
            <path pathLength={1} d="M73 63c5 1 12-3 15-8 3 6 8 8 14 9M82 74c3 2 7 2 10-1" />
            <path
              pathLength={1}
              d="M78 85 61 96l-6 43 12 2 8-31-3 39 6 22h10l-2-25 9 25h10l-8-44 2-23 14 20 12-7-21-28-9-4"
            />
            <path pathLength={1} d="m76 93 11 7 10-8M87 100v29M72 130h25M78 171h-7m34 0h7" />
            <path pathLength={1} d="M181 54c-8 0-14 7-14 16s6 17 14 17 15-8 15-17-7-16-15-16Z" />
            <path pathLength={1} d="M167 68c7-1 14-7 16-12 3 7 7 10 13 11M174 76c3 2 7 2 10-1" />
            <path
              pathLength={1}
              d="m174 87-12 7-10 23 11 5 6-14-6 39 8 24h10l-2-25 12 25h10l-11-39-2-35 14-5"
            />
            <path pathLength={1} d="m172 95 10 7 6-5M164 132h26M170 171h-7m38 0h7" />
            <path
              pathLength={1}
              className="intro-wave"
              d="m202 92 8-22-3-13m3 13 6-10m-6 10 10-5m-10 5 11 1"
            />
            <path
              pathLength={1}
              d="m114 104 21-5 4 29-22 5-3-29Z"
              fill="#f5bb29"
              stroke="#195c90"
            />
            <path pathLength={1} d="m120 111 10-2m-9 8 10-2" />
          </g>
          <g className="intro-spark" stroke="#f5bb29" strokeWidth="2.5" strokeLinecap="round">
            <path pathLength={1} d="M131 42v12m-6-6h12m86-5 5-6m1 15 8-1" />
          </g>
        </svg>
      </div>
      <div className="opening-intro-brand">
        <img
          src="/images/logo.png"
          alt="T.S. Mishra University"
          width="438"
          height="134"
          decoding="sync"
          fetchPriority="high"
        />
        <span>YOUR NEXT CHAPTER BEGINS.</span>
        <div className="opening-intro-rule" aria-hidden="true" />
      </div>
    </div>
  );
}
