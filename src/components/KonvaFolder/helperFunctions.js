export const heightFixer = (windowHeight, windowWidth, imageWH) => {
	const extraWidthRatio = windowWidth / imageWH.width;
	const extraHeightRatio = imageWH.height * extraWidthRatio;
	return extraHeightRatio;
};

export function widthFixer(windowWidth, imageWH) {
	if (imageWH.width > windowWidth) {
		// return imageWH.width;
		return windowWidth;
	} else {
		return imageWH.width;
	}
}

export function downloadURI(customizedImage) {
	var link = document.createElement('a');
	link.setAttribute('crossOrigin', 'Anonymous');
	link.download = 'Jordan.png';
	link.href = customizedImage;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
