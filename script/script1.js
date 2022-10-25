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

var tagCloud = TagCloud(".Sphere", Texts, {
  // Sphere radius in px
  radius: screen.width > 750 ? 350 : 180,

  // animation speed
  // slow, normal, fast
  maxSpeed: "normal",
  initSpeed: "fast",

  // Rolling direction [0 (top) , 90 (left), 135 (right-bottom)]
  direction: 135,

  // interaction with mouse or not [Default true (decelerate to rolling init speed, and keep rolling with mouse).]
  keep: true,
});

// Giving color to each text in sphere
var color = "#FF662B";
document.querySelector(".Sphere").style.color = color;
