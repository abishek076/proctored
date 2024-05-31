// Capture video from webcam
async function startVideo() {
    const video = document.getElementById('video');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }
  
  // Monitor user activity
  function monitorUserActivity() {
    window.addEventListener('blur', () => {
      console.log('User switched tabs or minimized the browser');
      // You can send this data to your server here
    });
  
    document.addEventListener('mousemove', () => {
      console.log('Mouse moved');
      // You can send this data to your server here
    });
  
    document.addEventListener('keydown', (event) => {
      console.log('Key pressed:', event.key);
      // You can send this data to your server here
    });
  }
  
  // Prevent tab switching (simple alert example)
  function preventTabSwitch() {
    window.onblur = () => {
      alert('Please do not switch tabs during the exam');
      window.focus();
    };
  }
  
  // Initialize proctoring
  function initProctoring() {
    startVideo();
    monitorUserActivity();
    preventTabSwitch();
  }
  
  document.addEventListener('DOMContentLoaded', initProctoring);
  