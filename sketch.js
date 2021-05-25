let table;
let size = 0;
let resolution =10;
let resolutionW =10;
let resolutionH =10;

let colA = [];
let colB = [];

let minA, maxA;
function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("BTC2.csv", "csv", "header");
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);

   noStroke();
  //noCursor()

  // let testArray = []
  let Date1 = table.getRow(120);
  print(Date1.length)
  for (let i = 0; i < resolution; i++) {
    let currVal = parseFloat(Date1.arr[i]);
    colA.push(currVal);
  }
   let Date2 = table.getRow(130);
  for (let y = 0; y < resolution; y++) {
    let currVal = parseFloat(Date2.arr[y]);
    colB.push(currVal);
  }

  maxA = colA.reduce(function (a, b) {
    return Math.max(a, b);
  });
  print(maxA);
  minA = colA.reduce(function (a, b) {
    return Math.min(a, b);
  });
  print(minA);
  
  maxB = colB.reduce(function (a, b) {
    return Math.max(a, b);
  });
  print(maxB);
  minB = colB.reduce(function (a, b) {
    return Math.min(a, b);
  });
  print(minB);
  
 resolutionW = width / resolution;
  resolutionH = height / resolution;
}

function draw() {
  loop();
  background(220);
     // print (mouseX + " " + mouseY)

  rect(0, 0, 10, height);
  for (y = 0; y < resolution; y++) {
    for (i = 0; i < resolution; i++) {
      let index = i + y * resolution;
      let valueR = colA[i];
      //print (value)
      valueR = map(valueR, minA, maxA, (mouseX/width)*100, (mouseY/height)*50);

      let valueB = colB[y];
      valueB = map(valueB, minB, maxB, (mouseX/width)*100, (mouseY/height)*50);
      // print (valueR + " " + valueB)
      // print(valueB)
      fill(valueR, valueB, 100);
      rect(i * resolutionW, y * resolutionH, resolutionW, resolutionH);
   }
  }
  //noLoop();
}

function keyPressed() {
  saveCanvas('BitGraph'+random(10000), 'png');
  

}
