window.scroll({
  top: 0,
  left: 0,
  behavior: "smooth",
});

window.scrollBy({
  top: 0,
  left: 0,
  behavior: "smooth",
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 570) {
    $(".menu").addClass("nav__bg-color");
  } else {
    $(".menu").removeClass("nav__bg-color");
  }
});

const navSlide = () => {
  const burger = document.querySelector(".navigation-burger");
  const nav = document.querySelector(".navigation-bar");
  const navLinks = document.querySelectorAll(".navigation-bar li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("navigation-bar__active");

    navLinks.forEach((element, index) => {
      if (element.style.animation) {
        element.style.animation = "";
      } else {
        element.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });

    burger.classList.toggle("toggle");
  });
};

navSlide();

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
gsap.defaults({ ease: "none" });

gsap.set(".ball", { xPercent: -50, yPercent: -50 });

const tl = gsap.timeline({
  defaults: {
    duration: 0.05,
    autoAlpha: 1,
    scale: 2,
    transformOrigin: "center",
    ease: "elastic(2.5, 1)",
  },
});

const action = gsap
  .timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: "#svg",
      scrub: true,
      start: "top center",
      end: "bottom center",
    },
  })
  .to(".ball01", { duration: 0.01, autoAlpha: 1 })
  .to(
    ".ball01",
    { motionPath: { path: ".theLine", alignOrigin: [0.5, 0.5] } },
    0
  )
  .add(tl, 0);

$("#losAngeles").on("click", function () {
  newLocation(34.052235, -118.243683);
  $("#contact-us__los-angeles").addClass("active");
  $("#contact-us__los-angeles").siblings().removeClass("active");
});

$("#newYork").on("click", function () {
  newLocation(40.73061, -73.935242);
  $("#contact-us__new-york").addClass("active");
  $("#contact-us__new-york").siblings().removeClass("active");
});

$("#boston").on("click", function () {
  newLocation(42.361145, -71.057083);
  $("#contact-us__boston").addClass("active");
  $("#contact-us__boston").siblings().removeClass("active");
});

$("#detroit").on("click", function () {
  newLocation(42.331429, -83.045753);
  $("#contact-us__detroit").addClass("active");
  $("#contact-us__detroit").siblings().removeClass("active");
});

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("contact-us__map"), {
    center: new google.maps.LatLng(34.052235, -118.243683),
    zoom: 10,
  });

  addMarker({ lat: 34.052235, lng: -118.243683 });
  addMarker({ lat: 40.73061, lng: -73.935242 });
  addMarker({ lat: 42.361145, lng: -71.057083 });
  addMarker({ lat: 42.331429, lng: -83.045753 });

  function addMarker(coordinates) {
    let marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      icon: "img/map-marker__main.svg",
    });
  }
}

function newLocation(newLat, newLng) {
  map.setCenter(new google.maps.LatLng(newLat, newLng));
}