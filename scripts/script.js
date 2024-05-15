//https://www.superhi.com/video/smooth-movements-with-javascript

// const ball = document.querySelector(".mouse");
var r = document.querySelector(':root');

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let ballSize = 40;

let speed = 0.05;


function animate(){
  
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;
  
  ballX = ballX + (distX * speed);
  ballY = ballY + (distY * speed);
  
  r.style.setProperty('--x', ballX+"px");
  r.style.setProperty('--y', ballY+"px");
  
  requestAnimationFrame(animate);
}
animate();

document.addEventListener("mousemove", function(event){
  mouseX = event.pageX;
  mouseY = event.pageY;
})


let no_cursor_elements = [
    ".nav-right .links",
    ".nav-right .sound",
    ".skills",
    ".history .skills",
    ".companies .skills",
]

function AddListeners(){

    no_cursor_elements.forEach((elem)=>{

        document.querySelector(elem).addEventListener("mousemove",()=>{
            r.style.setProperty('--size', 0+"px");
        });
    
        document.querySelector(elem).addEventListener("mouseout",()=>{
            r.style.setProperty('--size', ballSize+"px");
        });
    })

    document.querySelectorAll('.expand-cursor').forEach((elem)=>{
        
        elem.addEventListener("mousemove",()=>{
            r.style.setProperty('--size', 400+"px");
        });
    
        elem.addEventListener("mouseout",()=>{
          r.style.setProperty('--size', ballSize+"px");
        });
    })

}
AddListeners();

