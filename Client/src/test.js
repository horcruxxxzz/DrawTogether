var draging = false,
  dragStargLocation = {},
  snapshort;

var canvas = document.getElementById('map');
var ctx = canvas.getContext('2d');

function takeStore() {
  snapshort = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restore() {
  ctx.putImageData(snapshort, 0, 0);
}

function drawLine(position) {
  ctx.beginPath();
  ctx.moveTo(dragStargLocation.x, dragStargLocation.y);
  ctx.lineTo(position.x, position.y);
  ctx.setLineDash([5, 5]);
  ctx.stroke();
}

function drag(e) {
  if (!draging) {
    return;
  }
  restore();
  var position;
  position = getCanvasCoordinates(e);

  drawLine(position);
}

function dragEnd(e) {
  draging = false;
  restore();
  var position = getCanvasCoordinates(e);
  drawLine(position);
}

//
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
  dragStargLocation = getCanvasCoordinates(e);

  //테이크 스토어 옵 흔
  takeStore();
}

function init() {
  //마우스를 내리면 드래깅 스타트를 하고
  canvas.addEventListener('mousedown', dragStart, false);
  // 마우스를 무빙하면 드래깅을 하고
  canvas.addEventListener('mousemove', drag, false);
  // 마우스를 떼면 드래깅을 끝낸다
  canvas.addEventListener('mouseup', dragEnd, false);
}

window.addEventListener('load', init, false);
