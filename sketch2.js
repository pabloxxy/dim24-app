function setup() {
  createCanvas(800, 800);
  
  // Crear sliders y asignar valores iniciales
  iterationsSlider = createSlider(1, 6, 1, 1);
  iterationsSlider.position(20, 40);
  let p = createP('iteraciones');
  p.position(20, 5);
  
  let q = createP('proporción');
  q.position(20, 45);
  proportionSlider = createSlider(0.4, 0.8, 0.5, 0.1);
  proportionSlider.position(20, 80);
  
  let pq = createP('longitud');
  pq.position(20, 85);
  lengthSlider = createSlider(100, 600, 200, 50);
  lengthSlider.position(20, 120);
  
  length = lengthSlider.value();
  

  
  for (let i = 0; i < iterationsSlider.value()+1; i++){
    drawTSquareFractal(width/2 - length/2, height/2 - length/2, length, i);
  }
  
    // Escuchar cambios en los sliders
    iterationsSlider.changed(redrawFractal);
    proportionSlider.changed(redrawFractal);
    lengthSlider.changed(redrawFractal);
}

function redrawFractal() {
  clear();
  length = lengthSlider.value();;
  for (let i = 0; i < iterationsSlider.value()+1; i++){
    drawTSquareFractal(width/2 - length/2, height/2 - length/2, length, i);
  }
}

function drawTSquareFractal(x, y, len, iter) {
  if (iter === 0) {
    //noFill();
    stroke(0);
    fill(0);
    rect(x+len/2,y+len/2,len,len);
  } 
  else {
    if (iter ===1) {
      let newLen = len * proportionSlider.value();
      let offset = (len - newLen)/2 ;
      drawTSquareFractal(x - offset, y - offset, newLen, iter - 1);
      drawTSquareFractal(x + offset + len, y - offset, newLen, iter - 1);
      drawTSquareFractal(x - offset, y + offset + len, newLen, iter - 1);
      drawTSquareFractal(x + offset + len, y + offset + len, newLen, iter - 1);
  }
    else {
      let newLen = len * proportionSlider.value();
      let offset = (len - newLen) / 2;
      drawTSquareFractal(x - offset, y - offset, newLen, iter - 1);
      drawTSquareFractal(x + offset + len, y - offset, newLen, iter - 1);
      drawTSquareFractal(x - offset, y + offset + len, newLen, iter - 1);
      drawTSquareFractal(x + offset + len, y + offset + len, newLen, iter - 1);
  }
  }
}