import { decodeBlurHash } from "fast-blurhash";

function canvasLoader(blurHash, canvasRef, setImageData) {
	let width = 500;
	let height = 200;
	if (blurHash && width && height) {
		const pixels = decodeBlurHash(blurHash, width, height);
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		if (canvas && ctx) {
			const newImageData = ctx.createImageData(width, height);
			newImageData.data.set(pixels);
			setImageData(newImageData);
			ctx.putImageData(newImageData, 0, 0); // Draw the image
			console.log('Drawing Image:',blurHash);
		} else {
			console.error("Canvas or context is null");
		}
	}
}

export default canvasLoader;