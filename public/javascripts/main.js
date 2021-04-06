
// Hero swiper slider
var swiper = new Swiper('.swiper-container', {
  effect:'fade',
  speed:8000,    
  spaceBetween: 0,
  loop:true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay:{
      delay:1000,
  }
  });

  var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}