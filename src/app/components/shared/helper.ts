/**
* We get the character ID from the URL, which is always at the end
* @param url - entire url for character
*/
export function getCharacterIdFromUrl(url: string): string {
    if (!url) return '';
    return url.split('/').pop() ?? '';
}
