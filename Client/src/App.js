import { React, createRef, useEffect, useState } from 'react';
import './App.css';
//https://jsfiddle.net/richardcwc/cvem3wuv/
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

  let drawable = false;
  let cursorX,
    cursorY = -1;
  let firstClick = [0, 0];

  let ctx; //컨택스트

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
    canvas.addEventListener('click', clickDraw, false);
  }, []); // []를 사용하면 디드마운트 사용하는 것과 같다

  //손을 떼면 -1이 되고, 클릭하면 거기에 잡히니까... 여기에다가 라인을 주면 된다.
  //클릭할 때 직선이 되어야 함
  let isClick = false;

  function clickDraw(e) {
    console.log(drawable);
    if (!isClick) {
      isClick = true;
      cursorX = e.pageX;
      cursorY = e.pageY;
    } else if (isClick) {
      console.log(1);
      ctx.moveTo(firstClick[0], firstClick[1]);
      ctx.lineTo(cursorX, cursorY);
      ctx.stroke();
      ctx.closePath();
      isClick = false;
    }
  }
  function initDraw(e) {
    // firstClick = [e.pageX, e.pageY];
    // ctx.beginPath();
    // ctx.moveTo(firstClick[0], firstClick[1]);
    // ctx.lineTo(cursorX, cursorY);
    //ctx.lineTo(e.offsetX, e.offsetY);
    //ctx.stroke();
  }

  function draw(e) {
    drawable = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    firstClick = [e.pageX, e.pageY];
    ctx.beginPath();
    ctx.moveTo(firstClick[0], firstClick[1]);
    ctx.lineTo(cursorX, cursorY);

    //ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    //console.log(firstClick);
    // if (drawable) {
    //   //pos = { ...pos, ex: event.offsetX, ey: event.offsetY }; // 얘가 안 되는 것 같은데...
    //   ctx.moveTo(e.offsetX, e.offsetY);
    //   ctx.stroke();
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    // }
  }

  function finishDraw() {
    ctx.stroke();
    ctx.closePath();
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
