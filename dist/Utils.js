class Utils {
    static randomFont() {
        const fonts = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT"];
        return fonts[Math.floor(Math.random() * fonts.length)];
    }
    static randomChar() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    static randomHexColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    static isUserUsingMobile() {
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!isMobile) {
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            isMobile = (screenWidth < 768 || screenHeight < 768);
        }
        if (!isMobile) {
            isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        }
        if (!isMobile) {
            let bodyElement = document.getElementsByTagName('body')[0];
            isMobile = window.getComputedStyle(bodyElement).getPropertyValue('content').indexOf('mobile') !== -1;
        }
        return isMobile;
    }
}
export { Utils };
