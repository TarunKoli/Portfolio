const prompty = document.querySelector(".prompt");
const prompt_wrap = document.querySelector(".prompt_wrap");
const projects = document.querySelectorAll(".project");
const btn = document.querySelector(".close");

window.addEventListener("load", () => {
  let params = new URLSearchParams(window.location.search);
  if (params.get("prompt")) createPrompt(params.get("prompt"));
});

projects.forEach((pj) => {
  pj.addEventListener("click", () => {
    createPrompt(pj.getAttribute("data-val"));
  });
});

btn.addEventListener("click", () => {
  const url = new URL(window.location);
  window.history.pushState({}, "", url.href.split("?")[0]);

  prompty.style.animation = "promfy2 1s ease-in-out forwards";
  prompt_wrap.style.animation = "wrapfy2 1s ease-in-out forwards";
  document.querySelector(".p_snap").style.opacity = 0;
  document.querySelector(".p_details").style.opacity = 0;
});

function redirect(link, target = 0) {
  const a = document.createElement("a");
  a.href = `${link}`;
  if (target) a.target = "_blank";
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

function putDetails(data) {
  const details_wrap = document.querySelector(".details_wrap");
  const details_head = details_wrap.querySelector(".details_head h2");
  const link = details_wrap.querySelector(".visit");
  const content = details_wrap.querySelector(".desc");
  details_head.innerHTML = `${data.details.heading}<br />${data.details.type}`;

  let info = [];
  data.details.content.forEach((ctn) => {
    let p = document.createElement("p");
    p.innerHTML = ctn + "<br /><br />";
    info.push(p);
  });

  content.replaceChildren(...info);

  if (data.details.link) {
    link.style.display = "block";
    link.querySelector("a").href = data.details.link;
  } else {
    link.style.display = "none";
  }
}

function promptAnimation() {
  prompty.style.animation = "promfy 1s ease-in-out forwards";
  prompt_wrap.style.animation = "wrapfy 1s ease-in-out forwards";
  setTimeout(() => {
    document.querySelector(".p_snap").style.opacity = 1;
    document.querySelector(".p_details").style.opacity = 1;
  }, 1000);
}

function createPrompt(value) {
  var data = folder.get(value);
  let media = [];

  if (!data) return;

  const url = new URL(window.location);
  url.searchParams.set("prompt", value);
  window.history.pushState({}, "", url);

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

  promptAnimation();
  createCarousel(media);
  putDetails(data);
}

function remove_error(selector) {
  setTimeout(() => {
    selector.classList.remove("error");
  }, 5000);
}

function setToast(query, type) {
  let toast = document.querySelector(".toast");
  toast.classList.add("toast_active");
  toast.textContent = query;

  if (type === 1) {
    toast.style.background = "green";
  } else {
    toast.style.background = "red";
  }
  setTimeout(() => {
    toast.classList.remove("toast_active");
  }, 5000);
}

function sendMail() {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const subject = document.querySelector("#subject");
  const msg = document.querySelector("#msg");

  if (!name.value) {
    name.classList.add("error");
    remove_error(name);
    setToast("Name is required", 0);
    return;
  } else if (!email.value) {
    email.classList.add("error");
    remove_error(email);
    setToast("Email is required", 0);
    return;
  } else if (!subject.value) {
    subject.classList.add("error");
    remove_error(subject);
    setToast("Subject is required", 0);
    return;
  } else if (!msg.value) {
    msg.classList.add("error");
    remove_error(msg);
    setToast("Message is required", 0);
    return;
  }

  Email.send({
    SecureToken: "87e08354-0ac4-4f5c-9585-f71c6b57a093",
    To: ["amankumar8348@gmail.com", "tarunkoli0206@gmail.com"],
    From: "tarunkoli0206@gmail.com",
    Subject: subject.value,
    Body: `Name: ${name.value}<br />Email: ${email.value}<br />${msg.value}`,
  }).then((message) => {
    setToast("Message Delivered !", 1);
    name.value = "";
    email.value = "";
    subject.value = "";
    msg.value = "";
    if (name.matches(".error")) name.classList.remove("error");
    if (email.matches(".error")) email.classList.remove("error");
    if (subject.matches(".error")) subject.classList.remove("error");
    if (msg.matches(".error")) msg.classList.remove("error");
  });
}
