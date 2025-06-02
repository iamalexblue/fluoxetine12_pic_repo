document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('rickrollVideo');
    const loader = document.querySelector('.loader-container');
    const container = document.querySelector('.video-container');
    
    // 确保视频可以播放声音
    video.muted = false; // 取消静音
    video.volume = 1; // 设置音量为最大
    
    // 视频加载完成后隐藏加载动画
    video.addEventListener('canplay', () => {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
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
        
        const videoRatio = videoWidth / videoHeight;
        const containerRatio = containerWidth / containerHeight;
        
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
    
    // 处理移动端自动播放限制
    function handlePlay() {
        video.play().catch(error => {
            console.error('视频播放失败:', error);
            // 提示用户点击播放
            const playButton = document.createElement('button');
            playButton.textContent = '点击播放';
            playButton.style.position = 'fixed';
            playButton.style.top = '50%';
            playButton.style.left = '50%';
            playButton.style.transform = 'translate(-50%, -50%)';
            playButton.style.padding = '10px 20px';
            playButton.style.fontSize = '16px';
            playButton.style.zIndex = '3';
            playButton.addEventListener('click', () => {
                video.play().then(() => {
                    document.body.removeChild(playButton);
                });
            });
            document.body.appendChild(playButton);
        });
    }
    
    // 尝试播放视频
    video.addEventListener('loadeddata', handlePlay);
    
    // 用户交互后尝试播放（解决移动端自动播放限制）
    document.addEventListener('touchstart', handlePlay, { once: true });
    document.addEventListener('click', handlePlay, { once: true });
    
    // 尝试进入全屏模式
    function enterFullscreen() {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    }
    
    video.addEventListener('canplay', enterFullscreen);
    
    // 点击视频切换全屏状态
    video.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            enterFullscreen();
        }
    });
});    