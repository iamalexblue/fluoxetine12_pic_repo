// script.js

// 页面加载时尝试全屏播放
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('rickrollVideo');

    // 请求全屏
    function requestFullScreen() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    }

    // 检查视频是否可以播放
    video.addEventListener('canplay', () => {
        requestFullScreen();
    });
});