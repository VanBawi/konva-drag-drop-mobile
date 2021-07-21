import React, { useEffect, useRef } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

const StickerImage = ({
	item,
	onClick,
	image,
	shapeProps,
	isSelected,
	onSelect,
	onChange,
}) => {
	const shapeRef = useRef();
	const transformerRef = useRef();
	const [img] = useImage(image.src);

	useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			transformerRef.current.nodes([shapeRef.current]);
			transformerRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<>
			<Image
				width={100}
				height={80}
				image={img}
				x={image.x}
				y={image.y}
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onTransformEnd={(e) => {
					// transformer is changing scale of the node
					// and NOT its width or height
					// but in the store we have only width and height
					// to match the data better we will reset scale on transform end
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					//  will reset it back
					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						// set minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
			/>

			{isSelected && (
				<Transformer
					ref={transformerRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	);
};

export default StickerImage;
