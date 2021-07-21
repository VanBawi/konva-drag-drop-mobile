# Konva based revised image/stickers drag and drop for mobile (React)

```js
npm install react-konva-mobile-drag-and-drop
```

## API

```js

<KonvaStage
	stageImage,
	stickersArray,
  />
```

```js
import { KonvaStage } from 'react-konva-mobile-drag-and-drop';

<KonvaStage
	canvasWidth={400}
	canvasHeight={500}
	stageImage={stageImage}
	stickersArray={stickerArr}
/>;
```

---

# Required Props

| No  | Props         | Description                                    |
| --- | ------------- | ---------------------------------------------- |
| 1   | stageImage    | accept an image url only (draggable, zoomable) |
|     |               | default = url from unsplash                    |
| 2   | stickersArray | accepts array of image urls                    |

# Optional Props

| No  | Props                  | Description                                             |
| --- | ---------------------- | ------------------------------------------------------- |
| 1   | imageDraggable         | Boolean                                                 |
|     |                        | default = true                                          |
| 2   | stageStyle             | accepts normal jsx styles                               |
|     |                        | eg stageStyle={ border: '1px solid blue' }              |
| 3   | disableButtonsControls | Boolean (the buttons controls at stickers bottom)       |
|     |                        | default = true                                          |
| 4   | disableDotsControls    | Boolean (the dots controls at stickers bottom)          |
|     |                        | default = false                                         |
| 5   | stickerWidth           | the width of a sticker (controls the size of a sticker) |
|     |                        | default = 50                                            |
| 6   | stickerHeight          | the height of a sticker                                 |
|     |                        | default = 50                                            |
| 7   | stickerQtyRow          | the numbers of stickers to display in a single row      |
|     |                        | default = 5                                             |
| 8   | canvasWidth            | the width of the canvas                                 |
|     |                        | default = window.innerWidth                             |
| 9   | canvasHeight           | the Height of the canvas                                |
|     |                        | default = window.innerHeight - 158                      |
