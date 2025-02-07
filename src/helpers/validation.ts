export const validatePassword = (
    rule: any,
    value: any,
    callback: any,
    message = 'Mật khẩu bao gồm chữ cái viết hoa và có ít nhất 6 kí tự'
) => {
    const regex = /[A-Z]/;
    const isValid = regex.test(value);

    if (value && value.length >= 6 && isValid) {
        callback();
    } else {
        callback(message);
    }
};

export function standardString(strInput: string, convertToUppercase: boolean) {
    strInput = strInput.trim().toLowerCase();
    while (strInput.includes('  ')) {
        strInput = strInput.replace('  ', ' ');
    }
    if (strInput.length > 0) {
        let text = '';
        const array = strInput.split(' ');
        if (convertToUppercase) {
            array.forEach((text2) => {
                text += text2.charAt(0).toUpperCase() + text2.slice(1) + ' ';
            });
        } else {
            array.forEach((text3) => {
                text += text3 + ' ';
            });
        }
        return text.trimEnd();
    }
    return strInput;
}
