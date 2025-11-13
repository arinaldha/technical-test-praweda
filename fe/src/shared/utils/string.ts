export const convertToUnderscore = (text: string) => {
    return text.replace(/\s+/g, '_');
};

export const truncateText = (text: string, maxLength: number) => {
    if (text != null) {
        if (text?.length <= maxLength) {
            return text;
        }

        return text.substring(0, maxLength) + '...';
    }

    return '';
}

export function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}