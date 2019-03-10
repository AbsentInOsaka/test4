//YKK inspired projct that reflects its idea of calmness
/*Moonlight scene where there are shining streetlights in a submerged city.
Code will attempt to have flashing white lights in the water ,as well as have
a current that matches the color of the picture. It can be syncrhonized to
the music which will be taken from the osundtrack*/

//var img1;
var song;
var seaLights = [];
var canvas;
var x = 0;
var y = 0;
var ampInc1 = 0;
var ampInc2 = 25;

function preload() {
  	img1=loadImage("data/crop.png");
    song=loadSound("data/music2.mp3");
}

function setup() {
  //canvas + images
  canvas = createCanvas(620,200);
  canvas.position(1,250);
  canvas.parent('sketch-holder');
  //canvas.style('z-index','-99');

  //image(img1,0,0);

  //music
  song.setVolume(1);
  song.play();
  fft= new p5.FFT();
  analyzer= new p5.Amplitude();

  //Sea Lights array setup
  var totalS = 10;
  for (var i=0 ; i<totalS ; i++){
    seaLights.push(new lights());

  //stop lag plz
  /*var fr = 20;
  frameRate(fr);*/
  }
}

function draw() {
  background(img1,255);

  var amp = analyzer.getLevel();
  var spectrum = fft.analyze();

  for (var i=0 ; i<seaLights.length ; i++){
    //seaLights[i].pop();
    seaLights[i].display();
  }

  //soundwaves
  for(var i = 0; i < spectrum.length; i++){
    var h = map(spectrum[i], 0, 255, 0, 255);
    var x = map(i, 0, spectrum.length, 0, 960);
    var alpha = amp*4000;
    stroke(121,191,247,alpha);
if (h>.1){
      line(x, y-h+50, x, y-h+50);
      line(x, y-h+100, x, y-h+100);
      line(x, y-h+150, x, y-h+150);
      line(x, y-h+200, x, y-h+200);
      line(x, y-h+250, x, y-h+250);
      line(x, y-h+300, x, y-h+300);
      /*line(x, y-h+50, x, y-h+50);
      line(x, y-h+100, x, y-h+100);
      line(x, y-h+150, x, y-h+150);
      line(x, y-h+200, x, y-h+200);*/
    }
  }
  //window.setInterval(update,1);
}

function lights(){
  this.x = random(0,720);
  this.y = random(0,200);

  this.display = function(){
    var amp = analyzer.getLevel();
    ampInc1 += .25;
    ampInc2 += .25;
    if (ampInc1>25){
      this.x = random(0,720);
      this.y = random(0,200);
      ampInc1 = 0;
    }
    if (ampInc2>50){
      this.x = random(0,720);
      this.y = random(0,200);
      ampInc2 = 25;
    }
    stroke(255,255,255,255);
    line(this.x,this.y,this.x,this.y+amp*ampInc2);
    line(this.x,this.y,this.x,this.y-amp*ampInc2);
    line(this.x,this.y,this.x+amp*ampInc1,this.y);
    line(this.x,this.y,this.x-amp*ampInc1,this.y);
    noStroke();
    fill(255);
    ellipse(this.x,this.y,floor(amp*ampInc1),floor(amp*ampInc1));
  };
}
