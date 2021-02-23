import { React, createRef, useEffect, useState } from 'react';
import './App.css';

// // setting CSS variables inside this JS where they
// // can be declaratively used inside the CSS file.
// document.addEventListener('mousemove', function(e) {
//   docStyle.setProperty('--mouse-x', e.clientX);
//   docStyle.setProperty('--mouse-y', e.clientY);
// });
// https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes

function App() {
  let canvas;
  let canvasRef = createRef(); // Ref를 사용해 캔버스의 Dom 값을 가지고 옴

  let pos = {
    drawable: false,
    x: -1,
    y: -1,
  };
  let ctx; //컨택스트

  let [a, aset] = useState([initDraw, draw, finishDraw, finishDraw]);
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', a[0]);
    canvas.addEventListener('mousemove', a[1]);
    canvas.addEventListener('mouseup', a[2]);
    canvas.addEventListener('mouseout', a[3]);
  }, []); // []를 사용하면 디드마운트 사용하는 것과 같다

  function getPosition(event) {
    return { X: event.offsetX, Y: event.offsetY };
  }

  function initDraw(event) {
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(event) };
    ctx.moveTo(pos.X, pos.Y);
    console.log(pos);
  }

  //손을 떼면 -1이 되고, 클릭하면 거기에 잡히니까... 여기에다가 라인을 주면 된다.
  //클릭할 때 직선이 되어야 함
  function draw(event) {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(event) }; // 얘가 안 되는 것 같은데...
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  }

  function finishDraw() {
    //pos = { drawable: false, X: -1, Y: -1 };
  }

  function eraserEvent() {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  function linerEvent() {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  function resetEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function fillEvent(event) {}

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
        <div className='reset' onClick={resetEvent}>
          reset
        </div>
        <div className='fill' onClick={fillEvent}>
          fill
        </div>
      </div>
    </>
  );
}

export default App;
