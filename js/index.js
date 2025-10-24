(function () {
  const fields = {
    name: {
      el: document.getElementById("card-holder"),
      err: document.getElementById("err-name"),
    },
    cardNumber: {
      el: document.getElementById("card-number"),
      err: document.getElementById("err-cardNumber"),
    },
    expMM: {
      el: document.getElementById("expMM"),
      err: document.getElementById("err-expMM"),
    },
    expYY: {
      el: document.getElementById("expYY"),
      err: document.getElementById("err-expYY"),
    },
    cvc: {
      el: document.getElementById("cvc"),
      err: document.getElementById("err-cvc"),
    },
  };

  const preview = {
    name: document.getElementById("pv-name"),
    card: document.getElementById("pv-card"),
    exp: document.getElementById("pv-exp"),
    cvc: document.getElementById("pv-cvc"),
  };

  const nextBtn = document.getElementById("nextBtn");
  const form = document.getElementById("cardForm");

  const digitsOnly = (s) => /^\d+$/.test(s);
  const isTwoDigits = (s) => /^\d{2}$/.test(s);
  const isThreeFour = (s) => /^\d{3,4}$/.test(s);

  function validate() {
    const nameVal = fields.name.el.value.trim();
    const cardValRaw = fields.cardNumber.el.value.trim();
    const cardVal = cardValRaw.replace(/\s+/g, ""); // strip spaces
    const mm = fields.expMM.el.value.trim();
    const yy = fields.expYY.el.value.trim();
    const cvc = fields.cvc.el.value.trim();

    let valid = true;

    // Name
    if (!nameVal) {
      if (nameVal === "") fields.name.err.innerText = "Name is required.";
      fields.name.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.name.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else {
      fields.name.err.textContent = "";
      fields.name.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      fields.name.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
    }

    /// card number
    if (!cardVal) {
      fields.cardNumber.err.textContent = "Card number required.";
      fields.cardNumber.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.cardNumber.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else if (!digitsOnly(cardVal)) {
      fields.cardNumber.err.textContent = "Digits only (0–9).";
      fields.cardNumber.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.cardNumber.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else if (cardVal.length < 12 || cardVal.length > 19) {
      fields.cardNumber.err.textContent = "Invalid length.";
      fields.cardNumber.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.cardNumber.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else {
      fields.cardNumber.err.textContent = "";
      fields.cardNumber.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      fields.cardNumber.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
    }

    // exp month
    if (!mm) {
      fields.expMM.err.textContent = "MM required.";
      fields.expMM.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.expMM.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else if (!isTwoDigits(mm) || +mm < 1 || +mm > 12) {
      fields.expMM.err.textContent = "Must be 01–12.";
      fields.expMM.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.expMM.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else {
      fields.expMM.err.textContent = "";
      fields.expMM.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      fields.expMM.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
    }

    // Exp YY
    if (yy === "") {
      fields.expYY.err.textContent = "YY required.";
      fields.expYY.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.expYY.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else if (!isTwoDigits(yy)) {
      fields.expYY.err.textContent = "2 digits only.";
      fields.expYY.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.expYY.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else {
      fields.expYY.err.textContent = "";
      fields.expYY.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      fields.expYY.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
    }

    // CVC
    if (cvc === "") {
      fields.cvc.err.textContent = "CVC required.";
      fields.cvc.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.cvc.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else if (!isThreeFour(cvc)) {
      fields.cvc.err.textContent = "Must be 3–4 digits.";
      fields.cvc.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
      fields.cvc.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      valid = false;
    } else {
      fields.cvc.err.textContent = "";
      fields.cvc.el.classList.remove(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]"
      );
      fields.cvc.el.classList.add(
        "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
      );
    }

    nextBtn.disabled = !valid;

    // Live card preview
    preview.name.textContent = nameVal || "Adedamola Maxwell";
    preview.card.textContent = cardValRaw || "0000 0000 0000 0000";
    preview.exp.textContent = mm && yy ? `${mm}/${yy}` : "00/00";
    preview.cvc.textContent = cvc || "000";

    return valid;
  }

  // Auto-format card number with spaces
  fields.cardNumber.el.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 19);
    const groups = value.match(/.{1,4}/g);
    e.target.value = groups ? groups.join(" ") : "";
    validate(false); // no errors until form submit
  });

  Object.values(fields).forEach((f) =>
    f.el.addEventListener("input", () => validate(false))
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const complete = document.getElementById("completed");

    // Show errors only after submit
    if (validate(true)) {
      form.classList.add("hidden");
      complete.classList.remove("hidden");
      complete.classList.add("flex");
    } else {
      validate(true);
    }
  });
  window.addEventListener("load", () => {
    const disclaimerEl = document.getElementById("disclaimer");
    const removeDisclaimerEl = document.getElementById("remove-disclaimer");
    disclaimerEl.classList.remove("hidden");
    disclaimerEl.classList.add("block");

    removeDisclaimerEl.addEventListener("click", () => {
      disclaimerEl.classList.remove("block");
      disclaimerEl.classList.add("hidden");
    });
    // Remove message automatically after 4 seconds
    // setTimeout(() => msg.remove(), 4000);
  });
})();
