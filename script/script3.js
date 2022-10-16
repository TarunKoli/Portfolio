const prompty = document.querySelector(".prompt");
const prompt_wrap = document.querySelector(".prompt_wrap");
const projects = document.querySelectorAll(".project");
const btn = document.querySelector(".close");

projects.forEach((pj) => {
  pj.addEventListener("click", () => {
    prompty.style.animation = "promfy 1s ease-in-out forwards";
    prompt_wrap.style.animation = "wrapfy 1s ease-in-out forwards";

    anime
      .timeline({ loop: false })
      .add({
        targets: ".p_details",
        translateX: [-750, 0],
        translateY: [750, 0],
        opacity: 1,
        easing: "easeInOutExpo",
        elasticity: 600,
        duration: 1500,
        delay: 200,
      })
      .add({
        targets: ".close",
        scaleX: [0, 1],
        scaleY: [0, 1],
        duration: 100,
        easing: "spring(1, 1000,5, 0)",
      });

    anime.timeline({ loop: false }).add({
      targets: ".p_snap",
      opacity: 1,
      easing: "easeInOutExpo",
      elasticity: 600,
      duration: 1500,
      delay: 700,
    });
  });
});

btn.addEventListener("click", () => {
  prompty.style.animation = "promfy2 1s ease-in-out forwards";
  prompt_wrap.style.animation = "wrapfy2 1s ease-in-out forwards";
  document.querySelector(".p_snap").style.opacity = 0;
  document.querySelector(".p_details").style.opacity = 0;
});
