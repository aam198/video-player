const video = document.getElementById('video');
const play = document.getElementById('play');
const overlayPlay = document.getElementById('overlayPlay');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const videoFullScreen = document.getElementById('video_fullScreen');


// Play & Pause video

function toggleVideoStatus () {
    if (video.paused){
        video.play();
        overlayPlay.classList.add('hidden');
    }
    else {
        video.pause();
    }
}

// Update Play/Pause Icon 

function updatePlayIcon () {
    if(video.paused){
        play.innerHTML = '<span class="material-icons m-icon pause">&#xe037;</span>';
    }
    else{
        play.innerHTML = '<span class="material-icons m-icon play">&#xe034;</span>';
    }
}

// Update Progress & Timestamp

function updateProgress () {
    progress.value = (video.currentTime / video.duration) *100;
    console.log(progress.value);
    if(video.currentTime === video.duration){
        play.innerHTML = '<i class="fas fa-atom"></i>';
        overlayPlay.classList.remove('hidden');
    }
    //  Timestamp 

    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10 ){
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10 ){
        secs = '0' + String(secs);
    }
    //Use template string
    timestamp.innerHTML = `${mins}:${secs}`;

}



// Set video time to progress

function setVideoProgress () {
    video.currentTime = (+progress.value * video.duration) / 100;
}


// Stop video

function stopVideo () {
    video.currentTime=0;
    video.pause();
    overlayPlay.classList.remove('hidden');
}


//Event Listeners 

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);

video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

overlayPlay.addEventListener('click',toggleVideoStatus);
overlayPlay.addEventListener('pause', updatePlayIcon);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

videoFullScreen.addEventListener('click', function() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  });