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
}

export { Utils };