//https://www.superhi.com/video/smooth-movements-with-javascript

const ball = document.querySelector(".mouse");

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
  
//   ball.style.height = ballSize+"px";
//   ball.style.width = ballSize+"px";

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  
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
            ball.style.height = 0+"px";
            ball.style.width = 0+"px";
        });
    
        document.querySelector(elem).addEventListener("mouseout",()=>{
            ball.style.height = ballSize+"px";
            ball.style.width = ballSize+"px";
        });
    })

    document.querySelectorAll('.expand-cursor').forEach((elem)=>{
        
        elem.addEventListener("mousemove",()=>{
            ball.style.height = 400+"px";
            ball.style.width = 400+"px";
        });
    
        elem.addEventListener("mouseout",()=>{
            console.log("dfa");
            ball.style.height = ballSize+"px";
            ball.style.width = ballSize+"px";
        });
    })

}
AddListeners();

