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

  document.addEventListener("touchend", (e) => {
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
    if (!document.fullscreenElement) {
      (wrapper.requestFullscreen || wrapper.webkitRequestFullscreen).call(
        wrapper,
      );
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (["Space", "ArrowLeft", "ArrowRight", "KeyM"].includes(e.code)) {
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
