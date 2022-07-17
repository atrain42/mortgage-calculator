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
  let total = document.getElementById("total").value;
  let interest = document.querySelector("#interest").value;
  let duration = document.querySelector("#duration").value;
  let downPayment = document.querySelector("#down").value;
  try {
    if (total < 0 || interest < 0 || duration < 0 || downPayment < 0) {
      throw new Error("All values must be positive");
    }
    if (
      total === "" ||
      interest === "" ||
      duration === "" ||
      downPayment === ""
    ) {
      throw new Error("Please fill out all fields");
    }

    if (downPayment) {
      total = total - downPayment;
    }

    //calculations
    const monthlyInterest = (+interest * 0.01) / 12;
    const exponent = (1 + monthlyInterest) ** (+duration * 12);
    const numerator = monthlyInterest * exponent;
    const denominator = exponent - 1;
    const totalValue = total * (numerator / denominator);

    var output = Math.round(totalValue)
      .toLocaleString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const appendNumber = function () {
      if (!total || !interest || !duration || !downPayment) return;
      parentEl.innerHTML = "$" + output;
    };

    appendNumber();
  } catch (e) {
    alert.innerHTML = e.message;
  }
});
