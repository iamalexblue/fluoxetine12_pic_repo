// 全屏控制函数
function toggleFullScreen() {
    const video = document.getElementById('rickrollVideo');
    if (document.fullscreenElement) {
        // 退出全屏
        document.exitFullscreen();
    } else {
        // 进入全屏
        video.requestFullscreen();
    }
}

// 自动进入全屏（可选）
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        toggleFullScreen();
    }, 1000); // 延迟1秒触发，避免某些浏览器限制
});