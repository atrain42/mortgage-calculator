const submitBtn = document.querySelector("#submitBtn");
const clearBtn = document.querySelector("#clearBtn");
const inputs = document.querySelectorAll(".input");

let total = document.getElementById("total");
let interest = document.querySelector("#interest");
let duration = document.querySelector("#duration");
let downPayment = document.querySelector("#down");
let parentEl = document.querySelector("#paragraph-value");
let alert = document.querySelector("#alert");

clearBtn.addEventListener("click", function (e) {
  inputs.forEach((input) => {
    input.value = "";
  });

  parentEl.innerHTML = "";
  alert.innerHTML = "";
});

submitBtn.addEventListener("click", function () {
  // let total = document.getElementById("total").value;
  // let interest = document.querySelector("#interest").value;
  // let duration = document.querySelector("#duration").value;
  // let downPayment = document.querySelector("#down").value;
  try {
    if (
      total.value < 0 ||
      interest.value < 0 ||
      duration.value < 0 ||
      downPayment.value < 0
    ) {
      throw new Error("All values must be positive");
    }
    if (
      total.value === "" ||
      interest.value === "" ||
      duration.value === "" ||
      downPayment.value === ""
    ) {
      throw new Error("Please fill out all fields");
    }

    if (downPayment.value) {
      total.value = total.value - downPayment.value;
    }

    //calculations
    const monthlyInterest = (+interest.value * 0.01) / 12;
    const exponent = (1 + monthlyInterest) ** (+duration.value * 12);
    const numerator = monthlyInterest * exponent;
    const denominator = exponent - 1;
    const totalValue = total.value * (numerator / denominator);

    var output = Math.round(totalValue)
      .toLocaleString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const appendNumber = function () {
      if (
        !total.value ||
        !interest.value ||
        !duration.value ||
        !downPayment.value
      )
        return;
      parentEl.innerHTML = "$" + output;
    };

    appendNumber();
  } catch (e) {
    alert.innerHTML = e.message;
  }
});
