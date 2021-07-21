
# Konva based revised image/stickers drag and drop for mobile (React)

```js
npm install react-konva-mobile-drag-and-drop
```

```js

<KonvaStage  	
    canvasWidth,
	canvasHeight,
	stageImage,
	stickersArray, 
  />
```
---
# Required Props

```js
- canvasWidth = is the width of the canvas (default = window.innerWidth) 

- canvasHeight = is the Height of the canvas (default = window.innerHeight - 158) 

- stageImage = accept an image url only (default = url from unsplash)

- stickersArray = accepts array of image urls 
```
---

# Optional Props

```js
- imageDraggable = Boolean (default is true)

- stageStyle = optional (can pass normal jsx styles or styled)

- disableButtonsControls = Boolean (default is true) the button controls at stickers bottom

- disableDotsControls = Boolean (default is false)the dots controls at stickers bottom

-	stickerWidth = the width of a sticker (default is  50)

- stickerHeight = the height of a sticker (default is  50)

- stickerQtyRow = the numbers of stickers to display in a single row (default is  5)
```

