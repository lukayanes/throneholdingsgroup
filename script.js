// ===============================
// GOOGLE ADDRESS AUTOCOMPLETE
// ===============================

let selectedAddress = "";

function initAutocomplete() {
  const input = document.getElementById("autocomplete");
  if (!input) return;

  const autocomplete = new google.maps.places.Autocomplete(input, {
    componentRestrictions: { country: "us" },
    types: ["address"]
  });

  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    selectedAddress = place.formatted_address;
  });
}

window.initAutocomplete = initAutocomplete;

// ===============================
// FORM SUBMIT LOADING + REDIRECT
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("addressForm");
  if (!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();

    if(!selectedAddress){
      alert("Please select a valid address from the dropdown.");
      return;
    }

    const btn = document.getElementById("offerBtn");
    btn.innerText = "Requesting...";
    btn.disabled = true;

    setTimeout(function(){
      const encoded = encodeURIComponent(selectedAddress);
      window.location.href = "/get-your-offer.html?address=" + encoded;
    }, 1200);

  });

});

/* ===============================
   HAMBURGER DROPDOWN (ALL PAGES)
================================ */
function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  if (menu) menu.classList.toggle("show");
}

/* ===============================
   GET OFFER PAGE LOGIC
================================ */
document.addEventListener("DOMContentLoaded", function () {

  const offerForm = document.getElementById("offerPageForm");
  const offerBtn = document.getElementById("offerPageBtn");
  const offerInput = document.getElementById("offerAddress");

  if (offerForm && offerBtn && offerInput) {

    offerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const address = offerInput.value.trim();
      if (!address) return;

      offerBtn.innerText = "Requesting...";
      offerBtn.disabled = true;

      setTimeout(() => {
        window.location.href =
          "get-your-offer.html?address=" +
          encodeURIComponent(address);
      }, 800);
    });
  }

});

function openMenu() {
  document.getElementById("sideMenu").classList.add("active");
  document.getElementById("menuOverlay").classList.add("active");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("active");
  document.getElementById("menuOverlay").classList.remove("active");
}

// ===============================
// FLOATING OFFER SCROLL TRIGGER
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const floatingBar = document.getElementById("floatingOffer");
  const hero = document.querySelector(".hero");

  if (!floatingBar || !hero) return;

  function checkScroll() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY > heroBottom - 120) {
      floatingBar.classList.add("fixed");
    } else {
      floatingBar.classList.remove("fixed");
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // run once on load
});

// ===============================
// HERO ADDRESS BAR NAV REPLACEMENT
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const hero = document.querySelector(".hero");
  const floatingBar = document.getElementById("floatingOffer");
  const nav = document.querySelector(".top-nav");

  if (!hero || !floatingBar || !nav) return;

  function handleScroll() {

    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > heroBottom - 100) {
      floatingBar.classList.add("sticky");
      nav.classList.add("hidden");
    } else {
      floatingBar.classList.remove("sticky");
      nav.classList.remove("hidden");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

