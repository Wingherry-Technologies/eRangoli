(function () {
  "use strict";

  const video = document.getElementById("EEWV-mainVideo");
  const wrapper = document.getElementById("EEWV-videoWrapper");
  const clickOverlay = document.getElementById("EEWV-videoClickOverlay");
  const playPauseBtn = document.getElementById("EEWV-playPauseBtn");
  const playPauseIcon = document.getElementById("EEWV-playPauseIcon");
  const prevBtn = document.getElementById("EEWV-prevBtn");
  const nextBtn = document.getElementById("EEWV-nextBtn");
  const soundBtn = document.getElementById("EEWV-soundBtn");
  const soundIcon = document.getElementById("EEWV-soundIcon");
  const fullscreenBtn = document.getElementById("EEWV-fullscreenBtn");
  const progressTrack = document.getElementById("EEWV-progressTrack");
  const progressFill = document.getElementById("EEWV-progressFill");
  const progressThumb = document.getElementById("EEWV-progressThumb");
  const timeDisplay = document.getElementById("EEWV-timeDisplay");

  const ICONS = {
    pause: "../assets/E-EducationWatchVideo/pause.png",
    play: "../assets/E-EducationWatchVideo/playcircle.png",
    sound: "../assets/E-EducationWatchVideo/sound.png",
    mute: "../assets/E-EducationWatchVideo/mute.png",
    fullscreen: "../assets/E-EducationWatchVideo/fullscreen.png",
    exitFullscreen: "../assets/E-EducationWatchVideo/fullscreen.png",
  };

  let isScrubbing = false;

  function formatTime(secs) {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  function updatePlayState() {
    const paused = video.paused;
    playPauseIcon.src = paused ? ICONS.play : ICONS.pause;
    playPauseIcon.alt = paused ? "Play" : "Pause";
    wrapper.classList.toggle("EEWV-paused", paused);
  }

  function updateProgress() {
    if (!isScrubbing && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgressUI(pct);
      timeDisplay.textContent =
        formatTime(video.currentTime) + " / " + formatTime(video.duration);
    }
  }

  function setProgressUI(pct) {
    pct = Math.max(0, Math.min(100, pct));
    progressFill.style.width = pct + "%";
    progressThumb.style.left = pct + "%";
  }

  function seekToPercent(pct) {
    if (video.duration) {
      video.currentTime = (pct / 100) * video.duration;
      setProgressUI(pct);
      timeDisplay.textContent =
        formatTime(video.currentTime) + " / " + formatTime(video.duration);
    }
  }

  function getPercent(e) {
    const rect = progressTrack.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100),
    );
  }

  function togglePlayPause() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function getFullscreenElement() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      null
    );
  }

  function isFullscreen() {
    return !!getFullscreenElement();
  }

  function requestFullscreenOn(el) {
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
    if (el.msRequestFullscreen) return el.msRequestFullscreen();
    return Promise.reject(new Error("Fullscreen API not supported"));
  }

  function exitFullscreenDoc() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
    return Promise.reject(new Error("Exit fullscreen API not supported"));
  }

  function applyFallbackFullscreen() {
    wrapper.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      z-index: 2147483647 !important;
      border-radius: 0 !important;
      background: #000 !important;
    `;
    video.style.cssText = `
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
    `;
    wrapper.classList.add("EEWV-is-fullscreen");
    document.body.style.overflow = "hidden";
  }

  function removeFallbackFullscreen() {
    wrapper.style.cssText = "";
    video.style.cssText = "";
    wrapper.classList.remove("EEWV-is-fullscreen");
    document.body.style.overflow = "";
  }

  let usingFallbackFS = false;
  const originalVideoHeight = video.style.height || "";
  function removeVideoFixedHeight() {
    video.style.height = "";
    video.style.maxHeight = "none";
  }
  function restoreVideoFixedHeight() {
    video.style.height = originalVideoHeight;
    video.style.maxHeight = "";
  }

  function lockLandscape() {
    try {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(() => {});
      }
    } catch (_) {}
  }

  function unlockOrientation() {
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (_) {}
  }

  function toggleFullscreen() {
    if (isFullscreen() || usingFallbackFS) {
      if (usingFallbackFS) {
        removeFallbackFullscreen();
        restoreVideoFixedHeight();
        unlockOrientation();
        usingFallbackFS = false;
      } else {
        exitFullscreenDoc().catch(() => {
          removeFallbackFullscreen();
          restoreVideoFixedHeight();
          unlockOrientation();
          usingFallbackFS = false;
        });
      }
      return;
    }

    requestFullscreenOn(wrapper)
      .then(() => {
        removeVideoFixedHeight();
        lockLandscape();
      })
      .catch(() => {
        requestFullscreenOn(video)
          .then(() => {
            removeVideoFixedHeight();
            lockLandscape();
          })
          .catch(() => {
            usingFallbackFS = true;
            removeVideoFixedHeight();
            applyFallbackFullscreen();
            lockLandscape();
          });
      });
  }

  function updateFullscreenUI() {
    const inFS = isFullscreen() || usingFallbackFS;
    wrapper.classList.toggle("EEWV-is-fullscreen", inFS);
    if (!inFS) {
      restoreVideoFixedHeight();
      unlockOrientation();
    }
  }
  [
    "fullscreenchange",
    "webkitfullscreenchange",
    "mozfullscreenchange",
    "MSFullscreenChange",
  ].forEach((evt) => {
    document.addEventListener(evt, updateFullscreenUI);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && usingFallbackFS) {
      removeFallbackFullscreen();
      restoreVideoFixedHeight();
      unlockOrientation();
      usingFallbackFS = false;
    }
  });

  playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePlayPause();
  });

  clickOverlay.addEventListener("click", togglePlayPause);

  video.addEventListener("play", updatePlayState);
  video.addEventListener("pause", updatePlayState);
  video.addEventListener("ended", updatePlayState);

  video.addEventListener("timeupdate", updateProgress);

  video.addEventListener("loadedmetadata", () => {
    timeDisplay.textContent = "0:00 / " + formatTime(video.duration);
  });

  progressTrack.addEventListener("mousedown", (e) => {
    isScrubbing = true;
    seekToPercent(getPercent(e));
  });

  document.addEventListener("mousemove", (e) => {
    if (isScrubbing) seekToPercent(getPercent(e));
  });

  document.addEventListener("mouseup", (e) => {
    if (isScrubbing) {
      seekToPercent(getPercent(e));
      isScrubbing = false;
    }
  });

  progressTrack.addEventListener(
    "touchstart",
    (e) => {
      isScrubbing = true;
      seekToPercent(getPercent(e));
    },
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (isScrubbing) seekToPercent(getPercent(e));
    },
    { passive: true },
  );

  document.addEventListener("touchend", () => {
    if (isScrubbing) isScrubbing = false;
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.currentTime = Math.max(0, video.currentTime - 10);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
  });

  soundBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    soundIcon.src = video.muted ? ICONS.mute : ICONS.sound;
    soundIcon.alt = video.muted ? "Muted" : "Sound";
  });

  fullscreenBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFullscreen();
  });

  document.addEventListener("keydown", (e) => {
    if (["Space", "ArrowLeft", "ArrowRight", "KeyM", "KeyF"].includes(e.code)) {
      e.preventDefault();
    }
    switch (e.code) {
      case "Space":
        togglePlayPause();
        break;
      case "ArrowLeft":
        video.currentTime = Math.max(0, video.currentTime - 5);
        break;
      case "ArrowRight":
        video.currentTime = Math.min(
          video.duration || 0,
          video.currentTime + 5,
        );
        break;
      case "KeyM":
        soundBtn.click();
        break;
      case "KeyF":
        toggleFullscreen();
        break;
    }
  });

  document.getElementById("EEWV-messageBtn").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.getElementById("EEWV-menuBtn").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  updatePlayState();
})();
