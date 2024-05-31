let videoStream;
let monitoring = false;
let tabSwitchCount = 0;
const tabSwitchLimit = 3;

async function startVideoCapture() {
  const video = document.createElement('video');
  video.style.position = 'fixed';
  video.style.top = '0';
  video.style.right = '0';
  video.style.width = '200px';
  video.style.zIndex = '9999';
  video.id = 'proctoringVideo';
  document.body.appendChild(video);

  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = videoStream;
    //video.play();
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
}

function stopVideoCapture() {
  if (videoStream) {
    const tracks = videoStream.getTracks();
    tracks.forEach(track => track.stop());
    const videoElement = document.getElementById('proctoringVideo');
    if (videoElement) {
      videoElement.remove();
    }
  }
}

function monitorUserActivity() {
  monitoring = true;
  window.addEventListener('blur', handleBlur);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('keydown', handleKeyDown);
}

function stopMonitoringUserActivity() {
  monitoring = false;
  window.removeEventListener('blur', handleBlur);
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('keydown', handleKeyDown);
}

function handleBlur() {
  if (monitoring) {
    tabSwitchCount++;
    console.log('User switched tabs or minimized the browser');
    if (tabSwitchCount >= tabSwitchLimit) {
      chrome.runtime.sendMessage({ type: 'closeAllTabs' });
    }
  }
}

function handleMouseMove() {
  if (monitoring) {
    console.log('Mouse moved');
  }
}

function handleKeyDown(event) {
  if (monitoring) {
    console.log('Key pressed:', event.key);
  }
}

window.onblur = () => {
  if (monitoring) {
    alert('Please do not switch tabs during the exam',tabSwitchCount);
    window.focus();
  }
};

// Full-screen mode
function enterFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
}

// Prevent copying, cutting, and pasting
function preventCopying() {
  document.addEventListener('copy', preventDefaultAction);
  document.addEventListener('cut', preventDefaultAction);
  document.addEventListener('paste', preventDefaultAction);
  document.addEventListener('contextmenu', preventDefaultAction); // Prevent right-click context menu
}

function allowCopying() {
  document.removeEventListener('copy', preventDefaultAction);
  document.removeEventListener('cut', preventDefaultAction);
  document.removeEventListener('paste', preventDefaultAction);
  document.removeEventListener('contextmenu', preventDefaultAction);
}

function preventDefaultAction(event) {
  event.preventDefault();
}
