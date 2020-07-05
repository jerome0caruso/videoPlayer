const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");


function toggleVideoStatus() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = "<i class='fa fa-play fa-2x'</i>";
    } else {
        play.innerHTML = "<i class='fa fa-pause fa-2x'</i>";
    }
}
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100; //grabbing perctage thats been played
    console.log(progress.value);
    let mins = Math.floor(video.currentTime /60);// gives min from sec's (rounds down)
    if(mins < 10 ){
        mins = "0" + String(mins);
    }
    let secs = Math.floor(video.currentTime % 60);//until 60 just returns currentTime but after,it would cal the time with mins and secs played out
    if(secs < 10 ){
        secs = "0" + String(secs);
    }
    timestamp.innerHTML = `${mins}:${secs}`;
}
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) /100; //it take the percentage played and gives time in sec.
} 
//sound
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext;

const volumeSlider = document.querySelector(".volume");
const audioSource = audioCtx.createMediaElementSource(video);

const gainNode = audioCtx.createGain();

volumeSlider.addEventListener("input", function() {
    gainNode.gain.value = this.value;
})
audioSource.connect(gainNode).connect(audioCtx.destination);



//sound
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
