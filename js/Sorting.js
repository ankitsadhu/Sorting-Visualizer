let values = [];
//let w = 10;
//let y =2*w;
var Choise ;
let states = [];
var m;
var w;
var y;
var rangeVal;
var speed =50;
//Main function
function setup() {
createCanvas(windowWidth*0.5, windowHeight*0.9);
//console.log('new value'+ range);
console.log(windowWidth);
m = 72;
w = floor(windowWidth/(m*4));
y = 2*w;

//slider Values
var rangeslider = document.getElementById("myRange"); 
var output = rangeslider.value; 
  rangeslider.oninput = function() {  
  //console.log(this.value);
  
  m = this.value;
  w = floor(windowWidth/(m*4));
  y = 2*w;
        }
 setTimeout(()=>{
  console.log('this is m ' + m);
  console.log('this is width ' + w);
  console.log('this is y ' + y);
},5000);

 //speed = map(m,7,72,500,50);
   generate(m);
document.querySelector(".QuickSort").addEventListener("click",function(){
    Choise = 0;
  });

document.querySelector(".BubbleSort").addEventListener("click",function(){
    Choise = 1;
  });

document.querySelector(".Generate").addEventListener("click",function(){
   generate(m);
 });
document.querySelector(".btn").addEventListener("click",function(){
  
  switch(Choise) {
    case 0:
    console.log("QuickSort");
    quickSort(values, 0, values.length - 1);
    break;
    case 1:
    console.log("BubbleSort");
    
    break;
  
}
   });
  
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background(255);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill('#E0777D');
    } else if (states[i] == 1) {
      fill('#D6FFB7');
    } else {
      fill('#0091c9');
    }
    rect(i * y,0, w, values[i],0,0,6,6);
    if(values.length < 15){
    fill(255);
    noStroke();
    textAlign(CENTER);
    text(floor(values[i]), i * y + w/2, values[i]/2);
    //text(floor(values[i]), i * y +20, values[i] +10);
    }
  }
}


function generate(m){
  values = new Array(floor(m));
  console.log(values.length);
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
}

async function swap(arr, a, b) {
  await sleep(speed);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

