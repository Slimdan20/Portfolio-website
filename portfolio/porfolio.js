let contact = document.querySelectorAll('a[href^="#"]');
let special = document.querySelectorAll(".header-content ul li");
contact.forEach((anchor) => {
  anchor.addEventListener("click", correct);
});
function correct(e) {
  e.preventDefault();
  let target = this.getAttribute("href");
  let targetSection = document.querySelector(target);
  let offset = targetSection.offsetTop;
  window.scrollTo({
    top: offset - 100,
    behavior: "smooth",
  });
}

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

special.forEach((anchor) => {
  anchor.addEventListener("click", open);
});

let icon = document.querySelector(".imaging");
let element = document.querySelector(".header-content ul");
console.log(element);
icon.addEventListener("click", open);
function open() {
  if (window.innerWidth <= 850) {
    if (element.style.display === "none" || element.style.display === "") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
}
