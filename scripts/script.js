
window.onload = function(){
    var height = document.documentElement.scrollHeight;
    document.getElementsByTagName('body')[0].style.height = height + 'px';
    document.querySelector('.body_wrapper').style.position = 'fixed';

    const bodyLoadFade = document.querySelectorAll('.body-load-fade');
    const textRise = document.querySelectorAll('.body-load-fade .text-rise');

    bodyLoadFade.forEach((animBox,i)=>{
        animBox.classList.add("active");
    });
    
    textRise.forEach((animText, i)=>{
        animText.classList.add("active");        
    });
}



// Scroll Animation
const main = document.querySelector('.body_wrapper');
let damping = 0.05;
let pageDist = 0;

function animateScroll(){

    const scrollY = window.scrollY;

    const dist = scrollY - pageDist;
    
    pageDist += dist * damping;
    
    main.style.transform = `translateY(${-pageDist}px)`;
}


// Mouse Animation
const r = document.querySelector('.mouse');
let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let ballSize = 40;
let updatedSize = 40;

const speed = 0.1;

document.addEventListener("mousemove", function(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
});

function toThreeDecimals(value) {
    return Math.round(value * 1000) / 1000;
}   
  
function animateMouse(){
  
    const distX = mouseX - ballX;
    const distY = mouseY - ballY;

    ballX = toThreeDecimals(ballX + distX * speed);
    ballY = toThreeDecimals(ballY + distY * speed);

    r.style.setProperty('--x', `${ballX}px`);
    r.style.setProperty('--y', `${ballY}px`);
}



// All animation loop
function animate(){
    
    // Update my scroll animation
    animateScroll();

    // Update Mouse Animation
    animateMouse();

    requestAnimationFrame(animate);
}
animate();