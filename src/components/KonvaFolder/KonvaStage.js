import React, { createRef, useState, useRef, useEffect } from 'react';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { carouselStickers } from './stickersData';
import StickerImage from './stickerImage';
import { heightFixer, widthFixer } from './helperFunctions.js';
import useImage from 'use-image';

const sticker1 =
	'https://images.unsplash.com/photo-1610936534975-7c632359eb07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const sticker2 =
	'https://images.unsplash.com/photo-1562037283-5346e96c7ee9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1005&q=80';
const sticker3 =
	'https://images.unsplash.com/photo-1587483166702-bf9aa66bd791?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const sticker4 =
	'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const sticker5 =
	'https://images.unsplash.com/photo-1529650604660-cec743ea7788?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80';
export const KonvaStage = ({
	canvasWidth,
	canvasHeight,
	imageDraggable,
	stageStyle,
	disableButtonsControls,
	disableDotsControls,
	stageImage,
	stickerWidth,
	stickerHeight,
	stickerQtyRow,
	stickersArray,
}) => {
	const dragUrl = useRef();
	const stageRef = useRef();
	const [images, setImages] = useState([]);
	const [selectedSticker, selectSticker] = useState(null);

	const [customizedImage, setCustomizedImage] = useState(null);
	const [dragAndDrop, setDragAndDrop] = useState(false);
	const [selected, setSelected] = useState(false);
	const [imageWH, setImageWH] = useState({ width: '', height: '' });
	const [windowHeight, setWindowHeight] = useState('');

	const [customizeDone, setCustomizeDone] = useState(false);
	const [photoLink, setPhotoLink] = useState('');
	const [uploadImage, setUploadImage] = useState(false);
	const [canvasBgImage] = useImage(photoLink, 'anonymous');
	const [isZooming, setIsZooming] = useState(false);
	const [stickerArr, setStickerArr] = useState([
		sticker1,
		sticker2,
		sticker3,
		sticker4,
		sticker5,
	]);

	useEffect(() => {
		// get user phone number from params or storage
		setWindowHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		if (stageImage) {
			return setPhotoLink(stageImage);
		}
		if (!stageImage) {
			setPhotoLink(
				'https://images.unsplash.com/photo-1626701302924-e5988467eeaa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
			);
		}
	}, [stageImage]);

	useEffect(() => {
		if (stickersArray) {
			setStickerArr(stickersArray);
		}
	}, [stickersArray]);

	useEffect(() => {
		var img = new Image();
		// this makes able to convert to url

		img.onload = function () {
			const imgWidth = img.naturalWidth;
			const imgHeight = img.naturalHeight;
			setImageWH({ width: imgWidth, height: imgHeight });
		};
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = photoLink;
	}, [photoLink]);

	const checkDeselect = (e) => {
		setSelected(true);
		// deselect when clicked on background image area
		const clickedOnEmpty = e.target && e.target.attrs.id === 'backgroundImage';
		if (clickedOnEmpty) {
			selectSticker(null);
			setSelected(false);
		}
	};

	const addStickerToPanel = ({ src, width, x, y, id }) => {
		setImages((currentImages) => [
			...currentImages,
			{
				width,
				x,
				y,
				src,
				id: images.length + 1,
				resetButtonRef: createRef(),
			},
		]);
	};

	const deleteSticker = () => {
		if (selectedSticker) {
			// delete sticker by it's id
			const newImages =
				images.length && images.filter((e) => e.id !== selectedSticker.id);
			setImages(newImages);
			setSelected(false);
		}
	};

	const onFinish = () => {
		setUploadImage(false);
		let canvasImage = stageRef.current;
		canvasImage = canvasImage.toDataURL({
			mimeType: 'image/png',
			quality: 1,
		});

		setCustomizedImage(canvasImage);
		setCustomizeDone(true);
	};

	const imageHeight = heightFixer(
		window.innerHeight,
		window.innerWidth,
		imageWH
	);
	/// zoom functions
	function getDistance(p1, p2) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	}

	function getCenter(p1, p2) {
		return {
			x: (p1.x + p2.x) / 2,
			y: (p1.y + p2.y) / 2,
		};
	}

	var lastCenter = null;
	var lastDist = 0;

	const handleMultiTouch = (e) => {
		e.evt.preventDefault();

		var touch1 = e.evt.touches[0];
		var touch2 = e.evt.touches[1];
		const stage = e.target.getStage();

		if (touch1 && touch2) {
			setIsZooming(true);

			var p1 = {
				x: touch1.clientX,
				y: touch1.clientY,
			};
			var p2 = {
				x: touch2.clientX,
				y: touch2.clientY,
			};

			if (!lastCenter) {
				lastCenter = getCenter(p1, p2);
				return;
			}
			var newCenter = getCenter(p1, p2);

			var dist = getDistance(p1, p2);

			if (!lastDist) {
				lastDist = dist;
			}

			// local coordinates of center point
			var pointTo = {
				x: (newCenter.x - stage.x()) / stage.scaleX(),
				y: (newCenter.y - stage.y()) / stage.scaleX(),
			};

			var scale = stage.scaleX() * (dist / lastDist);

			stage.scaleX(scale);
			stage.scaleY(scale);

			// calculate new position of the stage
			var dx = newCenter.x - lastCenter.x;
			var dy = newCenter.y - lastCenter.y;

			var newPos = {
				x: newCenter.x - pointTo.x * scale + dx,
				y: newCenter.y - pointTo.y * scale + dy,
			};

			stage.position(newPos);
			stage.batchDraw();

			lastDist = dist;
			lastCenter = newCenter;
		}
	};
	const multiTouchEnd = (e) => {
		lastCenter = null;
		lastDist = 0;
		setIsZooming(false);
		checkDeselect(e);
	};

	const handleDragStart = (e) => {
		const stage = e.target.getStage();
		if (isZooming) {
			stage.stopDrag();
		}
		checkDeselect(e);
	};

	const responsive = {
		// set how many stickers per page
		0: { items: stickerQtyRow ? Number(stickerQtyRow) : 5 },
	};

	// console.log('customizeDone', customizeDone);
	// console.log('saveText', saveText);

	return (
		<div className='customize-content-photo bg-cover'>
			<div
				style={{
					padding: '0 20px',
					backgroundColor: '#49c3ea',
					height: '50px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<div onClick={deleteSticker}>
					<span style={{ color: selected && selectedSticker ? 'red' : '#fff' }}>
						Delete
					</span>
				</div>

				<div style={{ fontWeight: '500', color: 'white' }} onClick={onFinish}>
					Save
				</div>
			</div>

			<div
				onDrop={(e) => {
					e.preventDefault();
					// register event position
					stageRef.current.setPointersPositions(e);
					// add image
					setImages(
						images.concat([
							{
								...stageRef.current.getPointerPosition(),
								src: dragUrl.current,
								width: stickerWidth ? stickerWidth : 50,
								height: stickerHeight ? stickerHeight : 50,
								id: images.length + 1, // passing id
							},
						])
					);
				}}
				onDragOver={(e) => e.preventDefault()}>
				<Stage
					style={
						stageStyle
							? { ...stageStyle }
							: { borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }
					}
					width={canvasWidth ? canvasWidth : window.innerWidth}
					height={canvasHeight ? canvasHeight : windowHeight - 158}
					ref={stageRef}
					scaleX={1}
					scaleY={1}
					onTouchMove={handleMultiTouch}
					onTouchEnd={multiTouchEnd}>
					<Layer>
						<KonvaImage
							draggable={imageDraggable ? imageDraggable : true}
							image={canvasBgImage}
							width={widthFixer(window.innerWidth, imageWH)}
							height={imageHeight}
							id='backgroundImage'
							onDragStart={handleDragStart}
						/>

						{images.map((image, index) => {
							return (
								<StickerImage
									image={image}
									key={index}
									shapeProps={image}
									isSelected={image === selectedSticker}
									onSelect={() => {
										selectSticker(image);
									}}
									onChange={(newAttrs) => {
										const newImages = images.slice();
										newImages[index] = newAttrs;
										setImages(newImages);
									}}
								/>
							);
						})}
					</Layer>
				</Stage>
			</div>
			<div style={{ height: '100px' }}>
				<AliceCarousel
					mouseTracking
					disableButtonsControls={
						disableButtonsControls ? disableButtonsControls : true
					}
					disableDotsControls={
						disableDotsControls ? disableDotsControls : false
					}
					responsive={responsive}
					items={carouselStickers(
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
					)}
				/>
			</div>
		</div>
	);
};
