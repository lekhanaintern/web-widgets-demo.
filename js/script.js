document.addEventListener("DOMContentLoaded", () => {

  // Range Slider dynamic value display
  const rangeSlider = document.getElementById("rangeSlider");
  const rangeValue = document.getElementById("rangeValue");
  if (rangeSlider && rangeValue) {
    rangeSlider.addEventListener("input", () => {
      rangeValue.textContent = rangeSlider.value;
    });
  }

  // Toggle Switch functionality
  const toggle = document.getElementById("toggleSwitch");
  const status = document.getElementById("toggleStatus");
  if (toggle && status) {
    toggle.addEventListener("change", () => {
      status.textContent = toggle.checked ? "ON" : "OFF";
    });
  }

  // Demo Form submit
  const demoForm = document.getElementById("demoForm");
  if (demoForm) {
    demoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted!");
    });
  }

  // Alert Box close functionality
  const alertBox = document.getElementById("alertBox");
  const closeAlert = document.getElementById("closeAlert");
  if (alertBox && closeAlert) {
    closeAlert.addEventListener("click", () => {
      alertBox.style.display = "none";
    });
  }

  console.log("All widgets loaded successfully");

});
