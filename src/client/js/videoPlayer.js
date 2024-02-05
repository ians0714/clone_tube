const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = document.querySelector("i");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const video = document.querySelector("video");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const volume = document.getElementById("volume");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = 0.5;

const handlePlayClick = (e) => {
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

const handleMute = (e) => {
    muteBtn.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const formatTime = (seconds) => new Date(seconds*1000).toISOString().substring(14, 19);
const handleLoadedMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeLine.max = Math.floor(video.duration);
}
const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
}
const handleTimeChange = (event) => {
    const {target:{value}} = event;
    video.currentTime = value;
}

const handleVolumeChange = (event) => {
    const {target:{value}} = event;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    video.volume = value;
    volumeValue = value;
}

const handleFullScreenBtn = () => {
    if(document.fullscreenElement === null){
        videoContainer.exitFullscreen();
        fullScreenBtn.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.classList = "fas fa-compress";
    }
}

const hideControls = () => {
    videoControls.classList.remove("showing");
}
const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
}
const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
}

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {method: "POST"});
};

document.addEventListener("keyup", (event)=>{if(event.code==="Space"){handlePlayClick}});
document.addEventListener("keyup", (event)=>{if(event.code==="m"){handleMute}});
fullScreenBtn.addEventListener("click", handleFullScreenBtn);
muteBtn.addEventListener("click", handleMute);
playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("click", handlePlayClick);
timeLine.addEventListener("input", handleTimeChange);
timeLine.addEventListener("click", () => {this.focus()});
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("timeupdate", handleTimeUpdate);
volume.addEventListener("input", handleVolumeChange);
volume.addEventListener("click", () => {this.focus()});