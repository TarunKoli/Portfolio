const cusror = document.querySelector('.cursor');

document.addEventListener("mousemove",(e)=>{
    cusror.style.left = e.pageX + 'px';
    cusror.style.top = e.pageY + 'px';
})
