document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('rickrollVideo');
    const loader = document.querySelector('.loader-container');
    const container = document.querySelector('.video-container');
    
    // 视频加载完成后隐藏加载动画
    video.addEventListener('canplay', () => {
        // 延迟隐藏加载动画，确保视频准备好
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            // 完全隐藏加载动画
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    });
    
    // 窗口大小变化时重新调整视频
    window.addEventListener('resize', adjustVideo);
    
    // 初始调整视频
    function adjustVideo() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        
        // 计算视频宽高比和容器宽高比
        const videoRatio = videoWidth / videoHeight;
        const containerRatio = containerWidth / containerHeight;
        
        // 根据比例调整视频尺寸，确保完全覆盖容器
        if (containerRatio > videoRatio) {
            video.style.width = '100%';
            video.style.height = 'auto';
        } else {
            video.style.width = 'auto';
            video.style.height = '100%';
        }
    }
    
    // 视频元数据加载后调整
    video.addEventListener('loadedmetadata', adjustVideo);
    
    // 尝试进入全屏模式
    function enterFullscreen() {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) { /* Safari */
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { /* IE11 */
            container.msRequestFullscreen();
        }
    }
    
    // 视频可以播放时进入全屏
    video.addEventListener('canplay', enterFullscreen);
    
    // 点击视频也可以切换全屏状态
    video.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            enterFullscreen();
        }
    });
});    