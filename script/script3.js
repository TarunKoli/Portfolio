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
