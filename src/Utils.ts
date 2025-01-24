class Utils {
    static randomFont(): string {
        const fonts = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT"];
        return fonts[Math.floor(Math.random() * fonts.length)];
    }

    static randomChar(): string {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }

    static randomHexColor(): string {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    static isUserUsingMobile(): boolean {

        // User agent string method
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Screen resolution method
        if (!isMobile) {
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            isMobile = (screenWidth < 768 || screenHeight < 768);
        }

        // Touch events method
        if (!isMobile) {
            isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        }

        // CSS media queries method
        if (!isMobile) {
            let bodyElement = document.getElementsByTagName('body')[0];
            isMobile = window.getComputedStyle(bodyElement).getPropertyValue('content').indexOf('mobile') !== -1;
        }

        return isMobile
    }
}

export { Utils };