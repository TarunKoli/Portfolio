var text1 = document.querySelectorAll(".el1");
// var text2 = document.querySelectorAll('.el2');

function break_letters(textWrapper) {
  textWrapper.forEach((ltr) => {
    ltr.innerHTML = ltr.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
  });
}

function animate_head(elm) {
  anime.timeline({ loop: false }).add({
    targets: elm,
    scale: [0, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "spring(1, 1000, 10, 0)",
    elasticity: 600,
    duration: 950,
    delay: (el, i) => 100 * i,
  });
}

function hover_letter(letter) {
  letter.addEventListener("mouseenter", () => {
    anime.remove(letter);

    anime
      .timeline({ loop: false })
      .add({
        targets: letter,
        scaleY: [1, 0.7],
        scaleX: [1, 1.3],
        translateZ: 0,
        easing: "easeInOutExpo",
        elasticity: 600,
        duration: 300,
      })
      .add({
        targets: letter,
        scaleY: [0.7, 1],
        scaleX: [1.3, 1],
        easing: "spring(1, 1000,5, 0)",
        // elasticity: 600,
        duration: 100,
      });

    letter.removeEventListener("mousemove", () => {});
  });
}

break_letters(text1);
// break_letters(text2);
animate_head(".landing .el1 .letter");

var letters = document.querySelectorAll(".letter");

letters.forEach((letter) => {
  hover_letter(letter);
});

var sections = document.querySelectorAll("section");
var main = document.querySelector("main");
var visit = new Map();
visit.set("landing", true);

main.addEventListener("scroll", () => {
  sections.forEach((sec, i) => {
    var viewHeight = document.documentElement.clientHeight;
    var viewWidth = document.documentElement.clientWidth;
    var dim = sec.getBoundingClientRect();

    if (dim.y < viewHeight - 100 && dim.y > (viewHeight - 100) * -1) {
      if (!visit.get(sec.className)) {
        if (sec.className === "sec_5") {
          const counters = document.querySelectorAll(".counter");
          counters.forEach((ctn) => {
            ctn.style.width = ctn.getAttribute("data-val") + "%";
          });
        }

        visit.set(sec.className, true);
        let c_name = `.${sec.className} .el1 .letter`;
        animate_head(c_name);
      }
    }
  });
});
