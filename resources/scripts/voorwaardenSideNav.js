let open = false;

function openNav() {
  document.getElementById("side-nav").style.right = "0";
  document.getElementById("nav-button").innerHTML = "&#8680;"; // arrow pointing to the right
  open = true;
}

function closeNav() {
  document.getElementById("side-nav").style.right = "-14.6rem";
  document.getElementById("nav-button").innerHTML = "&#8678;"; // arrow pointing to the left
  open = false;
}

function setNav() {
  open === true ? closeNav() : openNav();
}