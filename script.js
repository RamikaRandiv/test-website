window.addEventListener("scroll", function () {
  var scrolled = window.pageYOffset;
  var parallax = document.querySelector(".parallax");
  var coords = "50% " + -(scrolled * 0.5) + "px";
  parallax.style.backgroundPosition = coords;
});

// Set the date we're counting down to
var countDownDate = new Date("July 24, 2024 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "X BAN HAS BEGUN";
    document.getElementById("demo").style.fontSize = "25px";
    document.getElementById("paragraph").hidden = "true";
  }
}, 1000);

// Define the block elements and corresponding button elements in arrays
var blocks = [];
var buttons = [];
for (let i = 1; i <= 8; i++) {
  blocks.push(document.getElementById(`block${i}`));
  buttons.push(document.getElementById(`b${i}`));
}

// Define the color sets for mouse enter and leave events
var enterColors = [
  "rgba(0, 0, 255, 1)",
  "rgba(0, 128, 0, 1)",
  "rgba(162, 0, 255, 1)",
  "rgba(0, 217, 255, 1)",
  "rgba(132, 0, 255, 1)",
  "rgba(219, 205, 3, 1)",
  "rgba(51, 255, 0, 1)",
  "rgba(78, 38, 141, 1)",
];

var leaveColors = [
  "rgba(0, 0, 255, 0.384)",
  "rgba(0, 128, 0, 0.267)",
  "rgba(162, 0, 255, 0.288)",
  "rgba(0, 217, 255, 0.199)",
  "rgba(132, 0, 255, 0.199)",
  "rgba(219, 205, 3, 0.199)",
  "rgba(51, 255, 0, 0.267)",
  "rgba(78, 38, 141, 0.247)",
];

// Add event listeners in a loop
buttons.forEach((button, index) => {
  button.addEventListener("mouseenter", function () {
    blocks[index].style.backgroundColor = enterColors[index];
  });
  button.addEventListener("mouseleave", function () {
    blocks[index].style.backgroundColor = leaveColors[index];
  });
});

/*const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));*/
