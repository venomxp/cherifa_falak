/**
 * Preloads an array of image URLs in the background.
 * This function creates Image objects and sets their src attribute,
 * which prompts the browser to download and cache them without
 * rendering them to the DOM.
 * @param {string[]} urls - An array of image URLs to preload.
 */
export const preloadImages = (urls: string[]): void => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};
