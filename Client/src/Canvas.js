// import React from 'react';
// import useCanvas from './useCanvas';

// const postdraw = () => {
//   index++;
//   ctx.restore();
// };

// const predraw = (context, canvas) => {
//   context.save();
//   resizeCanvasToDisplaySize(context, canvas);
//   const { width, height } = context.canvas;
//   context.clearRect(0, 0, width, height);
// };

// const Canvas = (props) => {
//   const { draw, predraw = _predraw, postdraw = _postdraw } = props;
//   const canvasRef = useCanvas(draw, { predraw, postdraw });

//   return <canvas ref={canvasRef} {...rest} />;
// };

// export default Canvas;
