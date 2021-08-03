// import css
import '../styles/main.scss';
import VIDEO from '../medias/boucle.mp4';

if (module.hot) {
    module.hot.accept();
}

// set video
const video = document.getElementById('video');

video.src = VIDEO;
video.play();

/**
 * set frame div size for keeping ratio 375px * 667px
 */
const setFrameSize = () => {
    const widthBrowser = window.innerWidth < window.screen.width ? window.innerWidth : window.screen.width;
    const heightBrowser = window.innerHeight < window.screen.height ? window.innerHeight : window.screen.height;
    const rateBrowser = widthBrowser / heightBrowser;
    const rate = 375 / 667;
    let v = 0;
    const newFrame = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        rotate: 0,
    };

    // If browser is in landscape
    if (rateBrowser >= rate) {
        newFrame.height = heightBrowser;
        newFrame.width = newFrame.height * rate;
        newFrame.left = 0;
    } else {
        // else if is portrait
        newFrame.width = widthBrowser;
        newFrame.height = newFrame.width / rate;
        newFrame.top = 0;
    }

    v = 1920 / newFrame.width;
    document.getElementsByTagName('html')[0].style.fontSize = `${(62.5 / v)}%`;

    const frame = document.getElementById('frame');

    frame.style.width = `${newFrame.width}px`;
    frame.style.height = `${newFrame.height}px`;
    frame.style.transform = `
        translateX(${newFrame.translateX}px) 
        translateY(${newFrame.translateY}px) 
        rotate(${newFrame.rotate})`;
};

// set frame size on resize
window.onresize = setFrameSize;

setFrameSize();
