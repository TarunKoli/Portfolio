//https://www.superhi.com/video/smooth-movements-with-javascript

// const ball = document.querySelector(".mouse");
var r = document.querySelector(':root');

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let ballSize = 40;
let updatedSize = 40;

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


const main = document.querySelector('.body_wrapper');
let damping = 0.03;
let pageDist = 0;
function animateScroll(){

    let dist = window.scrollY - pageDist;

    pageDist = pageDist + (dist * damping);

    main.style.top = -(pageDist)+'px';

    requestAnimationFrame(animateScroll);
}
animateScroll();

document.addEventListener("mousemove", function(event){
  mouseX = event.pageX;
  mouseY = event.pageY;
})


let no_cursor_elements = [
    ".nav-right .links",
    ".nav-right .sound",
]

function AddListeners(){

    var expand = false;
    var shrink = false;

    document.querySelectorAll('.no-cursor').forEach((elem)=>{
        elem.addEventListener("mouseenter",()=>{
            let speed = 4;
            function animate(val) {
                r.style.setProperty('--size', val+"px");
                updatedSize = val;

                if (parseInt(val)>0) {
                    window.requestAnimationFrame(function(){animate( val-speed < 0 ? 0 : val-speed )});
                }
            }

            if(!shrink){
                shrink = true;
                animate(updatedSize);
            }
        });
    
        elem.addEventListener("mouseleave",()=>{
            function animate(val) {
                r.style.setProperty('--size', val+"px");
                updatedSize = val;

                if (parseInt(val)<39) {
                    window.requestAnimationFrame(function(){animate( val+2 > 40 ? 40 : val+2 )});
                }
            }

            if(shrink){
                shrink = false;
                animate(updatedSize);
            }
        });
    })

    document.querySelectorAll('.expand-cursor').forEach((elem)=>{
        
        elem.addEventListener("mouseenter",(e)=>{
            e.stopPropagation();

            function animate(val) {
                r.style.setProperty('--size', val+"px");
                updatedSize = val;

                if (parseInt(val)<=400) {
                    window.requestAnimationFrame(function(){animate(val+10)});
                }
            }

            if(!expand){
                expand = true;
                animate(updatedSize);
            }
        });
    
        elem.addEventListener("mouseleave",()=>{
            function animate(val) {
                r.style.setProperty('--size', val+"px");
                updatedSize = val;

                if (parseInt(val)>40) {
                    window.requestAnimationFrame(function(){animate( val-10 < 40 ? 40: val-10)});
                }
            }

            if(expand){
                expand = false;
                animate(updatedSize);
            }
        });
    })

    document.querySelector('body').addEventListener("mousemove",()=>{
        
        function animate(val) {
            r.style.setProperty('--size', val+"px");
            updatedSize = val;

            if (parseInt(val)>40) {
                window.requestAnimationFrame(function(){animate( val-10 < 40 ? 40: val-10)});
            }
        }
       if(!expand){
            animate(updatedSize);
       }
    })
}
AddListeners();

window.onload = function(){
    var height = document.documentElement.scrollHeight;
    document.getElementsByTagName('body')[0].style.height = height + 'px';
    document.querySelector('.body_wrapper').style.position = 'fixed';
}

document.getElementsByTagName('body')[0].onscroll = (e) => {
    console.log(window.scrollY);
};