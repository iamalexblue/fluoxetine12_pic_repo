// 视频智能裁剪与背景模糊处理
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('rickrollVideo');
    const container = document.getElementById('videoContainer');
    const background = document.getElementById('videoBackground');
    const loader = document.querySelector('.loader-container');

    // 视频加载完成后隐藏加载动画
    video.addEventListener('canplay', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000); // 至少显示1秒加载动画
    });

    // 视频元数据加载后设置背景
    video.addEventListener('loadeddata', () => {
        // 创建视频缩略图作为背景
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 设置canvas尺寸
        canvas.width = 320;
        canvas.height = 180;
        
        // 绘制视频帧到canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 将canvas内容转为图片URL
        const imgUrl = canvas.toDataURL();
        
        // 设置为背景
        background.style.backgroundImage = `url(${imgUrl})`;
    });

    // 智能裁剪函数
    function adjustVideoFit() {
        const videoRatio = video.videoWidth / video.videoHeight;
        const containerRatio = container.clientWidth / container.clientHeight;
        
        if (videoRatio > containerRatio) {
            // 视频更宽，使用高度为基准
            video.style.height = '100%';
            video.style.width = 'auto';
        } else {
            // 视频更高，使用宽度为基准
            video.style.width = '100%';
            video.style.height = 'auto';
        }
    }

    // 初始调整与窗口变化时调整
    video.addEventListener('loadedmetadata', adjustVideoFit);
    window.addEventListener('resize', adjustVideoFit);
    setTimeout(adjustVideoFit, 100); // 确保初始调整

    // 全屏处理
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.error(`全屏请求失败: ${err.message}`);
            });
        }
    }

    // 视频准备好后进入全屏
    video.addEventListener('canplay', toggleFullScreen);
    
    // 点击视频切换全屏
    video.addEventListener('click', toggleFullScreen);
});
    