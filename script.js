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
