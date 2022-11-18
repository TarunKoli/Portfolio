const Texts = [
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "Mongoose",
  "ReactJS",
  "C++",
  "SASS",
  "Docker",
  "Tailwind",
  "REST",
  "ES5/ES6",
  "NodeJS",
  "MongoDB",
  "Git",
  "Express",
  "SQL",
  "jQuery",
  "Wordpress",
  "PWA",
];

function loadSphere() {
  document.querySelector(".Sphere").innerHTML = "";

  var tagCloud = TagCloud(".Sphere", Texts, {
    radius:
      screen.width > 1150
        ? 350
        : screen.width > 1050
        ? 300
        : screen.width > 480
        ? 250
        : 180,
    maxSpeed: "normal",
    initSpeed: "fast",
    direction: 135,
    keep: true,
  });
}

loadSphere();

window.addEventListener("resize", () => {
  loadSphere();
});

// Giving color to each text in sphere
var color = "#1dffff";
document.querySelector(".Sphere").style.color = color;
