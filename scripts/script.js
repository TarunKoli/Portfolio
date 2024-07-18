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

const lineMasks = document.querySelectorAll('.line_mask');
var viewHeight = document.documentElement.clientHeight;
const fillSpeed = 0.5;
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

    requestAnimationFrame(animateText);
}
animateText();

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


const comments = document.querySelectorAll('.comments .review');
const persons = document.querySelectorAll('.comments .person');
const pointer_wrap = document.querySelector('.comments .profile_wrapper');
const pointer = document.querySelector('.comments .profile-pointer');
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
            var dim = earth.getBoundingClientRect();
            if (dim.y < viewHeight && dim.y > -(viewHeight)) {
                
                if(initRead === 0) initRead = pageDist;
            
                translateEarth = true;
            }else translateEarth = false;
        }
    )()

};

const main = document.querySelector('.body_wrapper');
let damping = 0.03;
let pageDist = 0;
function animateScroll(){

    let dist = window.scrollY - pageDist;

    pageDist = pageDist + (dist * damping);

    main.style.top = -(pageDist)+'px';

    if(translateEarth)
        earth.style.transform = "translateY("+((pageDist-initRead)*0.015)+"%)";

    requestAnimationFrame(animateScroll);
}
animateScroll();


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