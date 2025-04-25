
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
    // main.style.top = -(pageDist)+'px';
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




// Magnetic Icons animation
function magneticIcons(){
    const icons = document.querySelectorAll('.nav-left .ic_btn');
    const maskIcons = document.querySelectorAll('.green-marker .nav-left .ic_btn');

    icons.forEach((icBtn, i)=>{

        icBtn.addEventListener('mousemove', (event) => {
        var magnetButton = event.currentTarget;
        var magnetButtonText = magnetButton.querySelector('.ic_content');
        var maskMagnetButtonText = maskIcons[i].querySelector('.ic_content');
        var bounding = magnetButton.getBoundingClientRect();
        var magnetsStrength = 40;
        var magnetsStrengthText = 20;


        let x = (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrength;
        let y = (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrength;

        magnetButton.style.transform = 'translate(' + x + 'px,' + y + 'px) rotateZ(0.001deg)';
        maskIcons[i].style.transform = 'translate(' + x + 'px,' + y + 'px) rotateZ(0.001deg)';

        let textX = (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrengthText;
        let textY = (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrengthText;

        magnetButtonText.style.transform = 'translate(' + textX + 'px,' + textY + 'px) rotateZ(0.001deg)';
        maskMagnetButtonText.style.transform = 'translate(' + textX + 'px,' + textY + 'px) rotateZ(0.001deg)';

        })

        icBtn.addEventListener('mouseleave', (event) => {
            var magnetButton = event.currentTarget;
            var magnetButtonText = magnetButton.querySelector('.ic_content');
            var maskMagnetButtonText = maskIcons[i].querySelector('.ic_content');

            magnetButton.style.transform = 'translate(' + 0 + 'px,' + 0 + 'px) rotateZ(0.001deg)';
            maskIcons[i].style.transform = 'translate(' + 0 + 'px,' + 0 + 'px) rotateZ(0.001deg)';
            magnetButtonText.style.transform = 'translate(' + 0 + 'px,' + 0 + 'px) rotateZ(0.001deg)';
            maskMagnetButtonText.style.transform = 'translate(' + 0 + 'px,' + 0 + 'px) rotateZ(0.001deg)';
        })

    })

}
magneticIcons();




function AddListeners(){

    var expand = false;
    var shrink = false;

    const mouse = document.querySelector('.mouse');

    document.querySelectorAll('.no-cursor').forEach((elem)=>{

        elem.addEventListener("mouseenter",()=>{
            let speed = 4;
            function animate(val) {
               
                r.style.setProperty('--size', `${val}px`);
                updatedSize = val;

                if (val > 0) {
                    window.requestAnimationFrame(() => animate(Math.max(0, val - speed)));
                }

            }

            if(!shrink){
                shrink = true;
                animate(updatedSize);
            }
        });
    
        elem.addEventListener("mouseleave",()=>{
            function animate(val) {

                r.style.setProperty('--size', `${val}px`);
                updatedSize = val;

                if (val < 39) {
                    window.requestAnimationFrame(() => animate(Math.min(40, val + 2)));
                }

            }

            if(shrink){
                shrink = false;
                animate(updatedSize);
            }
        });
    })

    document.querySelectorAll('.expand-cursor').forEach((elem)=>{
        let speed = 10;
        elem.addEventListener("mouseenter",(e)=>{
            e.stopPropagation();

            function animate(val) {
                r.style.setProperty('--size', val+"px");
                updatedSize = val;

                if (val<=400) {
                    window.requestAnimationFrame(function(){animate(val+speed)});
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

                if (val>40) {
                    window.requestAnimationFrame(function(){animate( val-speed < 40 ? 40: val-speed)});
                }
            }

            if(expand){
                expand = false;
                animate(updatedSize);
            }
        });
    })

}
AddListeners();



const lineMasks = document.querySelectorAll('.line_mask');
var viewHeight = document.documentElement.clientHeight;
const fillSpeed = 0.2;

function animateText(){
    lineMasks.forEach((line,i)=>{
        var dim = line.getBoundingClientRect();
        
        if (dim.y < viewHeight-100 && dim.y > -(viewHeight)) {

            var size = 100-((viewHeight-100-dim.y)*fillSpeed);
            if (size<1) size=0;
            else if(size>99) size=100;

            line.style.setProperty('--size', size+"%");
        }
    })
}




// All animation loop
function animate(){
    
    // Update Scroll Animation
    animateScroll();

    // Update Mouse Animation
    animateMouse();
    
    // Update Text Animation
    animateText();

    requestAnimationFrame(animate);
}
animate();


const comments = document.querySelectorAll('.comments .review');
const persons = document.querySelectorAll('.comments .person');
const pointer_wrap = document.querySelector('.comments .profile_wrapper');
const pointer = document.querySelector('.comments .profile-pointer');
const conclusion = document.querySelector('.conclude');
const earth = document.querySelector('.render-element');
var initRead = 0;
var translateEarth = false;

document.getElementsByTagName('body')[0].onscroll = (e) => {

    var viewHeight = document.documentElement.clientHeight;
    var viewWidth = document.documentElement.clientWidth;

    comments.forEach((sec, i) => {
        var dim = sec.getBoundingClientRect();
        
        if (dim.y+(dim.height/2) < viewHeight && (dim.y+dim.height+(dim.height/2)) > viewHeight ) {
            let index = parseInt(sec.getAttribute("data-profile"));
            persons[index].classList.add('active');

            const profileDim = persons[index].getBoundingClientRect();
            const wrapDim = pointer_wrap.getBoundingClientRect();
            pointer.style.top = profileDim.top-wrapDim.top+(profileDim.height/2)-5+'px';
        
        }else{
            let index = parseInt(sec.getAttribute("data-profile"));
            persons[index].classList.remove('active');
        }
    });

    (
        ()=>{
            var dim = conclusion.getBoundingClientRect();
            if (dim.y < viewHeight-(viewHeight/2) && dim.y > -(viewHeight)) {
                const textRise = conclusion.querySelectorAll('.text-rise');
                textRise.forEach((text, i)=>{
                    text.classList.add('active');
                })
            }
        }
    )()
};