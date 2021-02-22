import { React, createRef, useEffect } from 'react';
import './App.css';

function App() {
  let canvas;
  let canvasRef = createRef(); // Ref를 사용해 캔버스의 Dom 값을 가지고 옴

  let pos = {
    drawable: false,
    x: -1,
    y: -1,
  };
  let ctx; //컨택스트

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
  }, []); // []를 사용하면 디드마운트 사용하는 것과 같다

  function getPosition(event) {
    return { X: event.offsetX, Y: event.offsetY };
  }

  function initDraw(event) {
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(event) };
    ctx.moveTo(pos.X, pos.Y);
  }

  function draw(event) {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(event) };
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  }
  function finishDraw() {
    pos = { drawable: false, X: -1, Y: -1 };
  }

  function eraserEvent() {
    ctx.strokeStyle = '#ffffff';
  }
  function linerEvent() {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 20;
  }

  return (
    <>
      <canvas ref={canvasRef} width='600' height='600' />
      <div className='cursorBox'>
        <div className='liner' onClick={linerEvent}>
          liner
        </div>
        <div className='eraser' onClick={eraserEvent}>
          eraser
        </div>
      </div>
    </>
  );
}

export default App;
