function validateForm() {
    let formElement = document.querySelector(".login_form");
  
    function validateAllEntries() {
      let formGroups = document.querySelectorAll(".form-group");
      console.log(formGroups);
  
      formGroups.forEach((element) => {
        validateThisEntry(element);
      });
    }
  
    let validationCheckPoints = [
  
      {
        attribute: "pattern2",
        isValid: (input) => {
          const regex = /[a-zA-Z0-9]\W|_/g;
          return regex.test(input.value);
        },
        errorMessage: (input, label) =>
          `${label.textContent} needs to be Alpha-numeric. Should have at least 1 uppercase character, 1 lowercase character and a special character.`,
      },
  
      {
        attribute: "minlength",
        isValid: (input) =>
          input.value && input.value.length >= parseInt(input.minLength, 10),
        errorMessage: (input, label) =>
          `${label.textContent} needs to be of at least ${input.minLength} characters.`,
      },
  
      {
        attribute: "pattern",
        isValid: (input) => {
          const regex = /^(.+)@(.+)$/g;
          return regex.test(input.value);
        },
        errorMessage: (input, label) => `Not a valid ${label.textContent}.`,
      },
  
      {
        attribute: "required",
        isValid: (input) => input.value.trim() !== "",
        errorMessage: (input, label) => `${label.textContent} is requried.`,
      },
    ];
  
    function validateThisEntry(element) {
      let label = element.querySelector("label");
      let input = element.querySelector("input");
      let error = element.querySelector(".error");
      let errorIcon = element.querySelector(".error-icon");
      let successIcon = element.querySelector(".success-icon");
  
      let ifError = false;
      for (const option of validationCheckPoints) {
        if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
          error.textContent = option.errorMessage(input, label);
          errorIcon.classList.remove("hidden");
          ifError = true;
        }
      }
  
      if (ifError == false) {
        error.textContent = "";
        errorIcon.classList.add("hidden");
        successIcon.classList.remove("hidden");
      }
    }
  
    //  To disable browser Validation
    formElement.setAttribute("novalidate", "");
  
    // To disable relode on submit
    formElement.addEventListener("submit", (task) => {
      task.preventDefault();
      validateAllEntries(formElement);
    });
  
  
    // for one by one validation
    Array.from(formElement.elements).forEach(element => {
      element.addEventListener("blur", event => {
        console.log(event.srcElement.parentElement.parentElement);
        validateThisEntry(event.srcElement.parentElement.parentElement);
      });
    });
  
  
    document.getElementById("submit-btn").addEventListener('submit', captcha_varification => {
      let response = grecaptcha.getResponse();
      if (response.length == 0) {
        document.getElementById("g-recaptcha-error").textContent = "This field is requried.";
        return false;
      }
      return true
    })
  
    function verify_Captcha() {
      document.getElementById("g-recaptcha-error").textContent = "";
    }
  
  }
  validateForm();
  