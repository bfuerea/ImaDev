class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
    this.allOK();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        self.validateFields(input);
      });


      if (self.allOK() === "true") {
        this.createModal();
      };
    });


  }

  validateOnEntry() {


    let self = this;
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);
      if (input) {
        input.addEventListener('input', event => {
          self.validateFields(input);
        })
      }
    });

  }

  validateFields(field) {

    // Check presence of values
    if ((field.id != "gdpr") && (field.id != "bday") && (field.value.trim().length <= 4)) {
      this.setStatus(field, `${field.id} hasn't got enough characters`, "error");
    }
    else {
      // Proper Username check 
      if (field.id === "username") {
        const re = /\S+/;
        // accepting only name space name space name space name etc. 
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
        } else {
          this.setStatus(field, "Please enter a valid username", "error");
        }
      }

      // Proper name check
      if (field.id === "name") {
        // const re = /\D+$/i ;
        // accepting only name space name space name space name etc. 
        const re = /^[a-z.\s]+$/i;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
        } else {
          this.setStatus(field, "Please enter a valid name", "error");
        }
      }

      if (field.id === "cnp") {
        const re = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
        } else {
          this.setStatus(field, "Please enter a valid cnp", "error");
        }
      }


      // check for a valid email address
      if (field.type === "email") {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
        } else {
          this.setStatus(field, "Please enter valid email address", "error");
        }
      }

      // Checking password format 
      if (field.id === "password")  {
        const re = /(?=.*[!@#$%^&*])/;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
        } else {
          this.setStatus(field, "Password Not Strong Enough", "error");
        }
      }

      // Password confirmation edge case
      if (field.id === "password_confirmation") {
        const passwordField = this.form.querySelector('#password');

        if (field.value.trim() == "") {
          this.setStatus(field, "Password confirmation required", "error");
        } else if (field.value != passwordField.value) {
          this.setStatus(field, "Password does not match", "error");
        } else {
          this.setStatus(field, null, "success");
        }
      }

      // Make sure user checks T&C + GDPR
      if (field.id === "gdpr") {

        if (field.checked) {
          this.setStatus(field, null, "success");
        } else {
          this.setStatus(field, "uhm, you forgot to check this", "error");
        }

      }

      // Birth date is a special field so we need to check it individually
      if (field.id === "bday") {
        if (new Date(field.value) < new Date("2019-09-23")) {
          this.setStatus(field, null, "success");
        } else if (field.value === '') { 
          this.setStatus(field, "Please enter date here", "error");
        } else {
          this.setStatus(field, "are you even born?", "error");
        }
      }


    }


  }

  setStatus(field, message, status) {
    const errStyle = "border:1px solid red";
    const okStyle = "border:0px";
    const okIcon = '<span class="icon-success material-icons md-18" >check_circle</span>';
    const badIcon = '<span class="icon-error material-icons md-18" >remove_circle_outline</span>';

    if (status === "success") {
      field.style.cssText = "";
      field.nextElementSibling.innerHTML = "";
      field.nextElementSibling.nextElementSibling.innerHTML = okIcon;
    }

    if (status === "error") {
      field.style.cssText = errStyle;
      field.nextElementSibling.innerHTML = message;
      field.nextElementSibling.nextElementSibling.innerHTML = badIcon;
    }
  }

  createModal() {

    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    let modalcontent = document.createElement("div");
    modalcontent.innerHTML = '<div class="modal-header"><span class="close" onclick="closeModal()">&times;</span><h2>Hello there!</h2></div><div class="modal-body"><p>You are about to send sensible data to our servers! Are ya sure about that?</p><button id="sure" onclick="okay()">OK!</button><button id="nope" onclick="closeModal()">NOPE!</button></div><div class="modal-footer"><h3>&copy google helped a lot</h3>'
    modalcontent.setAttribute("class","modal-content");
    modal.appendChild(modalcontent);

  }

  allOK() {
    let condition = "true";
    let self = this;
    this.fields.forEach(field => {
    const input = document.querySelector(`#${field}`);
      if (input.style.cssText === "border: 1px solid red;") {
        condition = "false";
      }
    })
    return condition;
  }

}

const form = document.querySelector('.form');
const fields = ["username", "email", "password", "password_confirmation", "name", "cnp", "bday", "gdpr"];
const validator = new FormValidator(form, fields);
validator.initialize();
