import { React, useEffect, useState, useRef } from 'react';
import './App.css';
import PaintZone from "./Component/PaintZone"
import Door from "./Component/Door"

function App() {
  return (
    <div>
    <Door />
    <PaintZone />
    </div>
  );
}
export default App;
