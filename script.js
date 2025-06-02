// script.js
function toggleFullScreen() {
    const video = document.getElementById('rickrollVideo');
    if (document.fullscreenElement) {
        // 退出全屏
        document.exitFullscreen();
    } else {
        // 进入全屏
        video.requestFullscreen().catch(() => {
            console.error('Failed to enter fullscreen mode.');
        });
    }
}

function hideLoader() {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('rickrollVideo');

    // 监听视频加载完成事件
    video.addEventListener('canplay', () => {
        hideLoader(); // 隐藏加载动画
        toggleFullScreen(); // 自动进入全屏
    });

    // 如果需要立即进入全屏，可以使用以下代码
    setTimeout(() => {
        toggleFullScreen();
    }, 1000); // 延迟1秒触发，避免某些浏览器限制
});