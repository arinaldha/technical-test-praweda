

export function removeSpecialChar(input: string) {
    if(!input) return input
    
    return input.replace(/[^a-zA-Z0-9 ]/g, '')
}


export function removeHtmlTag(input: string) {
    if(!input) return input

    return input.replace(/<\/?[^>]+(>|$)/g, '');
}