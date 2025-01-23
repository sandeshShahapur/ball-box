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
}
export { Utils };
