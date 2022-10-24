const prompty = document.querySelector(".prompt");
const prompt_wrap = document.querySelector(".prompt_wrap");
const projects = document.querySelectorAll(".project");
const btn = document.querySelector(".close");

projects.forEach((pj) => {
  pj.addEventListener("click", () => {
    prompty.style.animation = "promfy 1s ease-in-out forwards";
    prompt_wrap.style.animation = "wrapfy 1s ease-in-out forwards";

    setTimeout(() => {
      document.querySelector(".p_snap").style.opacity = 1;
      document.querySelector(".p_details").style.opacity = 1;
    }, 1000);
  });
});

btn.addEventListener("click", () => {
  prompty.style.animation = "promfy2 1s ease-in-out forwards";
  prompt_wrap.style.animation = "wrapfy2 1s ease-in-out forwards";
  document.querySelector(".p_snap").style.opacity = 0;
  document.querySelector(".p_details").style.opacity = 0;
});

function redirect(link) {
  const a = document.createElement("a");
  a.href = `${link}`;
  a.click();
}

const hamburger = document.querySelector(".hamburger");
const bar = hamburger.querySelectorAll(".bar");
const nav = document.querySelector(".navbar");

function close_nav() {
  bar[0].classList.toggle("bar1");
  bar[1].classList.toggle("bar2");
  bar[2].classList.toggle("bar3");
  nav.classList.toggle("nav_visible");
}

hamburger.addEventListener("click", () => {
  close_nav();
});

const list = document.querySelectorAll(".navbar ul li a");
list.forEach((li) => {
  li.addEventListener("click", () => {
    close_nav();
  });
});

const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  close_nav();
});

function createCarousel(media) {
  var slider = document.querySelector(".slider");
  var next = document.querySelector(".next");
  var prev = document.querySelector(".prev");
  var counter = -1;

  next.addEventListener("click", () => {
    if (counter === media.length - 1) counter = 0;
    else counter++;
    slider.scrollTop = 0;

    let temp = [];
    temp.push(media[counter]);
    slider.replaceChildren(...temp);
  });

  prev.addEventListener("click", () => {
    if (counter === 0) counter = media.length - 1;
    else counter--;
    slider.scrollTop = 0;

    let temp = [];
    temp.push(media[counter]);
    slider.replaceChildren(...temp);
  });

  next.click();
  if (media.length === 1) {
    next.style.display = "none";
    prev.style.display = "none";
    return;
  } else {
    next.style.display = "block";
    prev.style.display = "block";
  }
}

function createPrompt(value) {
  var data = folder.get(value);
  let media = [];

  data.media.forEach((pj) => {
    if (pj.mime === "png" || pj.mime === "jpg" || pj.mime === "jpeg") {
      var img = document.createElement("img");
      img.src = `./assets/${value}/${pj.file}.${pj.mime}`;
      media.push(img);
    } else {
      var video = document.createElement("video");
      video.autoplay = true;
      video.loop = true;
      video.src = `./assets/${value}/${pj.file}.${pj.mime}`;
      media.push(video);
    }
  });

  createCarousel(media);
}

projects.forEach((pj) => {
  pj.addEventListener("click", () => {
    createPrompt(pj.getAttribute("data-val"));
  });
});
