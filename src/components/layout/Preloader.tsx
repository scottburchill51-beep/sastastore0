
"use client";

import { useEffect, useState } from "react";
import "./Preloader.css";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  useEffect(() => {
    const minimumTimer = window.setTimeout(() => {
      setMinimumTimePassed(true);
    }, 1200);

    const safetyTimer = window.setTimeout(() => {
      setLoaded(true);
    }, 4500);

    const handleLoad = () => setLoaded(true);

    if (document.readyState === "complete") {
      setLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(safetyTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!loaded || !minimumTimePassed) return;

    const exitTimer = window.setTimeout(() => {
      setVisible(false);
    }, 650);

    return () => window.clearTimeout(exitTimer);
  }, [loaded, minimumTimePassed]);

  if (!visible) return null;

  const exiting = loaded && minimumTimePassed;

  return (
    <div
      className={`ss-preloader ${exiting ? "ss-preloader-exit" : ""}`}
      role="status"
      aria-label="Loading SastaStore"
      aria-live="polite"
    >
      <div className="ss-preloader-glow ss-glow-one" />
      <div className="ss-preloader-glow ss-glow-two" />

      <div className="ss-preloader-content">

        {/* Brand */}
        <div className="ss-brand">
          <span>SASTASTORE</span>
          <span className="ss-brand-dot">.</span>
        </div>

        <div className="ss-brand-subtitle">
          YOUR DIGITAL WORLD, UPGRADED
        </div>

        {/* Animated logo */}
        <div className="ss-orbit-system">

          <div className="ss-orbit ss-orbit-one">
            <span className="ss-orbit-dot" />
          </div>

          <div className="ss-orbit ss-orbit-two">
            <span className="ss-orbit-dot ss-dot-two" />
          </div>

          <div className="ss-orbit ss-orbit-three" />

          <div className="ss-logo-core">
            <span className="ss-logo-letter">S</span>
          </div>

          <span className="ss-floating-particle particle-one" />
          <span className="ss-floating-particle particle-two" />
          <span className="ss-floating-particle particle-three" />
          <span className="ss-floating-particle particle-four" />

        </div>

        {/* Floating technology labels */}
        <div className="ss-floating-labels">
          <span>AI TOOLS</span>
          <span>CREATIVE</span>
          <span>PREMIUM</span>
        </div>

        {/* Main message */}
        <div className="ss-loading-heading">
          Experience Something Better.
        </div>

        <div className="ss-loading-description">
          Preparing your digital experience
          <span className="ss-loading-dots">
            <i />
            <i />
            <i />
          </span>
        </div>

        {/* Animated loading line */}
        <div className="ss-progress-track">
          <div className="ss-progress-fill" />
        </div>

        <div className="ss-loading-footer">
          <span>SMARTER DIGITAL SHOPPING</span>
          <span>© SASTASTORE</span>
        </div>

      </div>
    </div>
  );
}
