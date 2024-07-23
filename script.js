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



/* Time updater */
function timeSince(date) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 604800);
  if (interval > 1) {
    return interval + " weeks ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function updateTimes() {
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const timestamp = post.getAttribute("data-timestamp");
    const timeAgoElement = post.querySelector(".time-ago");
    if (timestamp && timeAgoElement) {
      timeAgoElement.textContent = timeSince(timestamp);
    }
  });
}
// Initial update
updateTimes();
// Update every minute
setInterval(updateTimes, 60000);

//search bar
function searchParagraphs() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const paragraphs = document.querySelectorAll(".paragraph");
  const noResultsMessage = document.getElementById("noResultsMessage");
  let resultsFound = false;

  if (searchTerm === "") {
    paragraphs.forEach((paragraph) => {
      paragraph.classList.add("show");
      removeHighlight(paragraph);
    });
    noResultsMessage.style.display = "none";
  } else {
    paragraphs.forEach((paragraph) => {
      const text = paragraph.innerText.toLowerCase();
      if (text.includes(searchTerm)) {
        paragraph.classList.add("show");
        highlightText(paragraph, searchTerm);
        resultsFound = true;
      } else {
        paragraph.classList.remove("show");
        removeHighlight(paragraph);
      }
    });
    noResultsMessage.style.display = resultsFound ? "none" : "block";
  }
}

function highlightText(paragraph, searchTerm) {
  const textNodes = getTextNodes(paragraph);
  textNodes.forEach((node) => {
    const parent = node.parentNode;
    const text = node.nodeValue;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const highlightedText = text.replace(
      regex,
      '<span class="highlight">$1</span>'
    );
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = highlightedText;
    while (tempDiv.firstChild) {
      parent.insertBefore(tempDiv.firstChild, node);
    }
    parent.removeChild(node);
  });
}

function removeHighlight(paragraph) {
  const highlightedNodes = paragraph.querySelectorAll("span.highlight");
  highlightedNodes.forEach((node) => {
    const parent = node.parentNode;
    parent.replaceChild(document.createTextNode(node.innerText), node);
    parent.normalize();
  });
}

function getTextNodes(node) {
  const textNodes = [];
  if (node.nodeType === 3) {
    textNodes.push(node);
  } else {
    node.childNodes.forEach((child) => {
      textNodes.push(...getTextNodes(child));
    });
  }
  return textNodes;
}

// Show all paragraphs on initial load
document.addEventListener("DOMContentLoaded", () => {
  const paragraphs = document.querySelectorAll(".paragraph");
  paragraphs.forEach((paragraph) => {
    paragraph.classList.add("show");
  });
});
