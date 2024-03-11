
let fractalDiv;
let divWidth, divHeight
let length, proportion, maxlevel, colorPicker, uploadedImage;

function setup() {
  //  Contenedor
  fractalDiv = createDiv();
  fractalDiv.parent("fractal");
  fractalDiv.class("fractalSkin")

  divWidth = fractalDiv.size().width;
  divHeight = fractalDiv.size().height;

  //let canvas = createCanvas(250,250);
  let canvas = createCanvas(divWidth, 250);
  canvas.parent(fractalDiv); // colocar canvas en contenedor
  //canvas.elt.classList.add("fractalSkin"); // Agregar canvas a clase de css



  // Crear sliders y asignar valores iniciales
  let text1 = createP('iteraciones');
  text1.parent("slider");
  //p.position(20, 5);
  iterationsSlider = createSlider(1, 6, 3, 1);
  iterationsSlider.parent("slider");
  iterationsSlider.class("sliderSkin");

  //  iterationsSlider.position(20, 40);

  let text2 = createP('proporción');
  text2.parent("slider");
  //  q.position(20, 45);
  proportionSlider = createSlider(0.2, 0.8, 0.4, 0.01);
  proportionSlider.parent("slider");
  proportionSlider.class("sliderSkin");
  //  proportionSlider.position(20, 80);

  let text3 = createP('longitud');
  text3.parent("slider");
  //  pq.position(20, 85);
  lengthSlider = createSlider(divWidth / 18, divWidth / 2, divWidth / 10, divWidth / 18);
  //lengthSlider = createSlider(width / 18, width / 2, width / 10, width / 18);
  lengthSlider.parent("slider");
  lengthSlider.class("sliderSkin");

  //  lengthSlider.position(20, 120);
  let texto_color = createP("Color del fondo");
  texto_color.parent("slider");
  colorPicker = createColorPicker(color(173, 216, 230));
  colorPicker.parent("slider");
  colorPicker.class("sliderSkin");


  iterationsSlider.changed(drawFractal);
  proportionSlider.changed(drawFractal);
  lengthSlider.changed(drawFractal);
  colorPicker.changed(drawFractal);
  // Evento para cambiar el colorPicker
  colorPicker.input(changeBackgroundColor);
}
function draw() {
  clear()
  translate(width / 2, height / 2);
  //translate(divWidth / 2,height/2);
  //translate(canvas.width / 2,canvas.height/2);

  drawFractal();
}

function drawFractal() {
  maxlevel = iterationsSlider.value();
  proportion = proportionSlider.value();
  length = lengthSlider.value();
  h = length / 2;
  f_1 = funciones(createVector(h, -h));
  g_1 = funciones(createVector(h, h));
  f_2 = funciones(createVector(-h, h));
  g_2 = funciones(createVector(-h, -h));
  transformaciones = [f_1, g_1, f_2, g_2];
  drawOrbit(transformaciones, createVector(-h, -h));
}

function funciones(direccion) {
  return function (p) {
    return p5.Vector.add(
      p5.Vector.mult(
        p5.Vector.add(p, direccion), proportion), direccion);
  }
}
function createIndexesNotInverse() {
  let inotinverse = [];
  let kinv;
  for (let k = 1; k <= 4; k++) {
    kinv = ((k + 1) % 4);
    let a = [];
    let b = [];
    for (let j = kinv + 1; j < 4; j++) {
      append(a, j);
    }
    for (let j = 0; j <= kinv - 1; j++) {
      append(b, j);
    }
    c = a.concat(b);
    inotinverse.push(c);
  }
  return inotinverse;
}
function drawOrbit(transformaciones, p){
  indexesNotInverse = createIndexesNotInverse();

  function traverseForward(p, index, level){
    square(p.x,p.y,length*(proportion**(level)));
    if (level >= maxlevel){
      return;
    }
    let indices = indexesNotInverse[index];
    for (let i=0; i<3;i++){
      traverseForward(transformaciones[indices[i]](p), indices[i], level+1);
    }
  }
  square(p.x,p.y,length);
  for(let i = 0;i<4;i++){
    traverseForward(transformaciones[i](p),i,1);
  }
}
  function windowResized() {
    // Actualiza el tamaño del lienzo cuando se cambia el tamaño de la ventana
    divWidth = fractalDiv.size().width;
    resizeCanvas(divWidth, 250);
  }
  //  Cambiar color background
  function changeBackgroundColor() {
    // Obtener el color seleccionado por el color picker
    let selectedColor = colorPicker.color();

    // Aplicar el color como fondo del contenedor fractalDiv
    fractalDiv.style("background-color", selectedColor.toString());
  }
