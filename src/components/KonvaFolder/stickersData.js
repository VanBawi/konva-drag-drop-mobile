function dragStartEvent(e, dragUrl) {
	dragUrl.current = e.target.src;
}

export const carouselStickers = (
	dragUrl,
	addStickerToPanel,
	stageRef,
	setImages,
	images,
	setDragAndDrop,
	dragAndDrop,
	stickerArr,
	stickerWidth,
	stickerHeight,
	stickerQtyRow
) => {
	function checkMoveEnd(e) {
		// console.log('end', e);
		e.preventDefault();
		// console.log('no drag');
		if (dragAndDrop) {
			// console.log('drag and drop');
			stageRef.current.setPointersPositions(e);
			// add image
			setImages(
				images.concat([
					{
						...stageRef.current.getPointerPosition(),
						src: e.target.currentSrc,
						width: 50,
						height: 50,
						id: images.length + 1,
					},
				])
			);
		}
	}

	function checkMoveStart(e) {
		if (e.targetTouches[0]) {
			// console.log('e.targetTouches[0].screenY', e.targetTouches[0].screenY);
			// screenY detects the drag goes to the canvas
			if (e.targetTouches[0].screenY < 900) {
				dragUrl.current = e.target.currentSrc;
				setDragAndDrop(true);
			} else {
				dragUrl.current = undefined;
				setDragAndDrop(false);
			}
		}
	}

	const stickersArr =
		stickerArr.length &&
		stickerArr.map((sticker, index) => {
			return (
				<>
					<img
						crossOrigin='anonymous'
						data-value={index + 1}
						alt='sticker'
						src={sticker}
						width={stickerWidth ? stickerWidth : '50'}
						height={stickerHeight ? stickerHeight : '50'}
						draggable='true'
						onTouchMove={(e) => checkMoveStart(e)}
						onTouchEnd={(e) => checkMoveEnd(e)}
						onDragStart={(e) => dragStartEvent(e, dragUrl)}
						onTouchStart={(e) => dragStartEvent(e, dragUrl)}
					/>
				</>
			);
		});

	return stickersArr;
};
