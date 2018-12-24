var song;
var amp;
var smoo = 0;
var volhistory = [];


// mic.start();
// mic = new p5.AudioIn();


//-----------------------------------------------------------
function preload() {
  song = loadSound('1974-01-06 To Ramona-Philadelphia-belleseb32.mp3');
}
//-----------------------------------------------------------

function mousePressed() {
  if(mouseX > lisaZ.width+lisaZ.x+5 || mouseY > lisaZ.height+lisaZ.y+5){
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }
}



function keyTyped() {
  if (key === 's') {
    song.stop();
    song.play();
  }
}


//-----------------------------------

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  angleMode(DEGREES);

  // lerpa
  lerptylerp = createSlider(0,1, .05,.001);
  lerptylerp.position(20,20)
  //comprimento
  cmp = createSlider(0,360*3, 360,1);
  cmp.position(20,50);
  //lissajoux
  lisaX = createSlider(-10,10, 1,.5);
  lisaX.position(20,80);
  lisaY = createSlider(-10,10, 1,1);
  lisaY.position(20,110);
  lisaZ = createSlider(-10,10, 1,1);
  lisaZ.position(20,140);

  song.play();
  amp = new p5.Amplitude();

}

function draw() {
  strokeWeight(10);
  background(0);

  noFill();

  var vol = amp.getLevel();
  //abaixo pega volume do microfone.
  // var vol = mic.getLevel();

  //lerptylerp - define o smoothing do gráfico
  smoo = lerp(smoo, vol, lerptylerp.value());
  volhistory.push(smoo);


  // translate(width / 2, height / 2);

  noFill();
  stroke(255);
  strokeWeight(15);
  // noStroke();

  //número de voltas
  vlts = 1 * 360

  var hu = 0;

//----------3D CAM-------------
  rotateX(mouseY*.01);
  // rotateZ(angle)
  rotateY(mouseX*.01);
//-----------------------------

  beginShape();
  for (var i = 0; i < cmp.value(); i++) {

    var r = map(volhistory[i], 0, 1, 10, height);
    var x = r * cos(i*lisaX.value());
    var y = r * sin(i*lisaY.value());
    var z = r * sin(i*lisaZ.value())
    vertex(x, y, z);

    // hu = map(volhistory[i], 0,1, 0,255);
    // fill(hu, 255, 255);

  }
  if(volhistory.length < cmp.value()){
    endShape();
  }

  else{
    // colocar como CLOSE caso queira a linha que une o início ao fim.
    endShape();
    volhistory.splice(0, 1);
  }

  beginShape()
    vertex(0,0,0)
    vertex(50,0,0)
  endShape()
  beginShape()
    vertex(0,0,0)
    vertex(0,50,0)
  endShape()
  beginShape()
    vertex(0,0,0)
    vertex(0,0,50)
  endShape()



  fill(255);
}
