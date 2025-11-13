export const convertToLinkUnderscore = (text: string) => {
    if (!text.includes(' ')) {
        return text.toLowerCase();
    }
    return text.replace(/\s+/g, '_').toLowerCase();
};
