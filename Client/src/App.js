import { React, useEffect, useState, useRef } from 'react';
import './App.css';

// https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
// https://codepen.io/samuli/pen/VemrdV
// https://codepen.io/liyajie/pen/MZyrpB

function App() {
  let canvas;
  let canvasRef = useRef(null); // Ref를 사용해 캔버스의 Dom 값을 가지고 옴
  let draging = false,
    dragStartLocation = {},
    snapshort;

  let ctx; //컨택스트
  let swichD = false;

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    //마우스를 내리면 드래깅 스타트를 하고
    canvas.addEventListener('mousedown', dragStart, false);
    // 마우스를 무빙하면 드래깅을 하고
    canvas.addEventListener('mousemove', drag, false);
    // 마우스를 떼면 드래깅을 끝낸다
    canvas.addEventListener('mouseup', dragEnd, false);
  }, []); // []를 사용하면 디드마운트 사용하는 것과 같다

  function swichDrag() {
    ctx.beginPath();
    ctx.moveTo(dragStartLocation.x, dragStartLocation.y);
  }

  // 드래그가 끝날 때
  function dragEnd(e) {
    draging = false;
    restore();
    let position = getCanvasCoordinates(e);
    drawLine(position);
  }

  // 드래그 중인 포지션을 넣은 드로우 라인
  function drawLine(position) {
    //일반 선은 비긴패스 빼야 됨
    // ctx.beginPath();
    // ctx.moveTo(dragStartLocation.x, dragStartLocation.y);

    //공통
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
  }

  function restore() {
    // 주어진 이미지데이타 개체의 데이터를 캔버스에 칠함.
    ctx.putImageData(snapshort, 0, 0);
  }

  // 드래그 중일 때
  function drag(e) {
    //만약에 start에서 드래깅이 false로 되어 있다면 리턴하고
    if (!draging) {
      return;
    }
    //리스토어 옵 흔
    restore();
    let position;
    position = getCanvasCoordinates(e);
    // 이렇게 한 이유: 유동적이라서
    // 드래그 중인 포지션을 받아서 드로우 라인에 넣음
    drawLine(position);
  }

  // 겟 이미지 데이타...  캔버스의 이미지를 가지고 오는 데에 사용
  // 스냅샷이라고 한 이유가 있지 않을까
  // 좌표와 폭, 높이를 주면 이 영역의 이미지 정보를 가지는 ImageData 객체가 리턴된다.
  // 미 쳤 다
  function takeStore() {
    snapshort = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  // 드래깅 스타트할 때 좌표값을 여기에 넣음
  function getCanvasCoordinates(e) {
    // 이벤트 타겟의 클라이언트 X를 구한 뒤 뺀다
    // getBoundingClientRect()를 쓰는 이유는 뷰포트 문제를 해결하기 위해서이다.
    // 공식 같음.
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;
    // 반환 값은 객체이고, x와 y값이 담겨 있음.
    return { x: x, y: y };
  }

  function dragStart(e) {
    //드래깅을 트루로 변환을 한다
    draging = true;
    // 드래그를 할 때 좌표값을 구한다. 구하는데, get으로 구함
    // e를 현재 e에 넣음
    dragStartLocation = getCanvasCoordinates(e);

    //일반 선
    ctx.beginPath();
    ctx.moveTo(dragStartLocation.x, dragStartLocation.y);

    //테이크 스토어 옵 흔
    takeStore();
  }

  function butEvt(e) {}

  return (
    <div>
      <canvas ref={canvasRef} width='600' height='600' />
      <button>일반</button>
      <button>직선</button>
    </div>
  );
}

export default App;
