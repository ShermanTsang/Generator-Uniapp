export const checkPasswordStrength = (password: string): boolean => {
    const reg = /^(?=.*[a-zA-Z])(?=.*[1-9])(?=.*[!|@|#|$|%|^|&|*|/]).{8,}$/;
    return reg.test(password);
};

export const getSafeMobile = (mobile: string): string => {
    const reg = /^(\d{3})\d{4}(\d{4})$/;
    return mobile.replace(reg, '$1****$2');
};

export const generateRandomColorValue = (): string => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += ((Math.random() * 16) | 0).toString(16);
    }
    return color;
};

export const getColorValueFromHexToRgba = (hex: string): string => {
    return parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7));
};

export const getSizeValueType = (value: string | null = null): 'tailwindSizeName' | 'rawHtmlSizeValue' | null => {
    if (!value) {
        return null;
    }
    if (value.includes('px') || value.includes('em')) {
        return 'rawHtmlSizeValue';
    } else {
        return 'tailwindSizeName';
    }
};

export const getColorValueType = (value: string | null = null): 'rawCssColorValue' | 'tailwindColorName' | null => {
    if (!value) {
        return null;
    }
    if (value.includes('#') || value.includes('(')) {
        return 'rawCssColorValue';
    } else {
        return 'tailwindColorName';
    }
};

export const getFileSize = (fileByte: string) => {
    if (typeof fileByte == 'string') {
        return fileByte;
    }
    const fileSizeByte = Number(parseFloat(fileByte).toFixed(2));
    let fileSizeMsg = '';
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB';
    else if (fileSizeByte === 1048576) fileSizeMsg = '1MB';
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB';
    else if (fileSizeByte > 1048576 && fileSizeByte === 1073741824) fileSizeMsg = '1GB';
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    else fileSizeMsg = '>1TB';
    return fileSizeMsg;
};

export const getPureTextFromHtml = (content: string, maxLength: number) => {
    if (content) {
        const pureContent = content.replace(/<[^>]+>/g, '').replace(/&\w+;/g, '');
        if (maxLength) {
            return maxLength > pureContent.length ? pureContent : `${pureContent.substr(0, maxLength)}...`;
        }
        return pureContent;
    }
    return null;
};

export const isEmptyValue = (val: any): boolean => {
    // null or undefined
    if (val == null) return true;

    if (typeof val === 'boolean') return false;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {
        // String or Array
        case '[object String]':
        case '[object Array]':
            return !val.length;

        // Map or Set or File
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size;
        }
        // Plain Object
        case '[object Object]': {
            return !Object.keys(val).length;
        }
    }

    return false;
};

export const getGroupedApps = (apps: Ewsedu.Business.AppItem[]): { text: string; children: Ewsedu.Business.AppItem[] }[] => {
    const groupedApps: { text: string; children: Ewsedu.Business.AppItem[] }[] = [];
    apps.forEach((item: Ewsedu.Business.AppItem) => {
        // 图标颜色处理
        if (!item.color) {
            item.color = generateRandomColorValue();
        }
        // 分组处理
        const targetGroup = groupedApps.find((group) => group.text === item.category_text);
        if (!targetGroup) {
            // @ts-ignore
            groupedApps.push({ text: item.category_text, children: [item] });
            return;
        }
        targetGroup.children.push(item);
    });
    return groupedApps;
};

export default {
    checkPasswordStrength,
    getSafeMobile,
    generateRandomColorValue,
    getColorValueFromHexToRgba,
    getSizeValueType,
    getColorValueType,
    getFileSize,
    getPureTextFromHtml,
    isEmptyValue,
    getGroupedApps
};
