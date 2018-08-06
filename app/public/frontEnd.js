$(() => {

  // Materialize Init
  M.AutoInit();

  $("#submit-button").click(() => {

    // Re-init form selects
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);
    // Collection of form select values
    let scores = [];
    let firstName = $("#firstName").val().trim();
    let lastName = $("#lastName").val().trim();
    let imgURL = $("#imgURL").val().trim();
    // Push form select values into variable values
    instances.forEach((instance) => {
      scores.push(parseInt(instance.getSelectedValues()[0]));
    });

    let newPerson = {
      firstName: firstName,
      lastName: lastName,
      imgURL: imgURL,
      scores: scores
    }

    let validity = validate(newPerson);

    clearInvalidInputMessages();

    if (validity.valid) {
      console.log("Yahtzee!");
      console.log(newPerson);
    }
    else {
      $("#invalidNotice").removeClass("hide");
      validity.issues.forEach((issue) => $(issue).removeClass("hide"));
    }

  });

  function clearInvalidInputMessages() {
    let invalidInputMessages = $(".invalid");
    invalidInputMessages.each((index, element) => {
      if (!$(element).hasClass("hide")) {
        $(element).addClass("hide")
      }
      if (!$("#invalidNotice").hasClass("hide")) {
        $("#invalidNotice").addClass("hide");
      }
    });
  }

  function validate(personObj) {
    let nameValidate = /^[A-Za-z\xC0-\xFF][A-Za-z\xC0-\xFF'-]+([ A-Za-z\xC0-\xFF][A-Za-z\xC0-\xFF'-]+)*/;
    let urlValidate = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
    let validity = {
      valid: true,
      issues: []
    };

    for (let key in personObj) {
      let valid;
      let value = personObj[key];
      let questions = [];
      if (typeof value === "string") {
        valid = (key === "firstName" || key === "lastName") ?
          textValidate(nameValidate.test(value), value) :
          textValidate(urlValidate.test(value), value);
      }
      else if (Array.isArray(value)) {
        let scoresValidation = scoresValidate(value);
        valid = scoresValidation.valid;
        questions = scoresValidation.badQuestions;
      }
      else {
        throw new Error("Invalid person object passed to function validate");
      }
      validity = updateValidity(valid, validity, key, questions);
    }

    return validity;

    function textValidate(testResult, text) {
      if (!text || text.length <= 0 || !testResult) {
        return false;
      }
      return true;
    }

    function scoresValidate(scores) {
      let badQuestions = [];
      return {
        valid: scores.reduce((accumulator, score, index) => accumulator ?
          (new Boolean(score)).valueOf() || (badQuestions.push("#question" + (index + 1) + "Invalid") && false) :
          (new Boolean(score)).valueOf() || (badQuestions.push("#question" + (index + 1) + "Invalid")) && false, true),
        badQuestions: badQuestions
      };
    }

    function updateValidity(valid, validity, issue, questions) {
      validity.valid = validity.valid ? valid : false;
      !valid && issue !== "scores" && validity.issues.push("#" + issue + "Invalid");
      if (questions.length > 0) {
        questions.forEach((question) => validity.issues.push(question));
      }
      return validity;
    }
  }

});