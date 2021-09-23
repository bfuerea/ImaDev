class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }  
  
  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }
  
  validateOnSubmit() {
    let self = this;
    
    this.form.addEventListener('submit', e => {
        e.preventDefault()
        self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input);
      })
    })
  }
  
  validateOnEntry() {
    let self = this;
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)
      input.addEventListener('input', event => {
        self.validateFields(input);
      })
    })
  }
  
  validateFields(field) {
  
    // Check presence of values
    if ( field.value.trim().length <= 5) {
      this.setStatus(field, `${field.id} hasn't got enough characters`, "error");
    } 
    else {
          // Proper Username check 
          if (field.id === "username") {
            const re = /\S+/ ;
          // accepting only name space name space name space name etc. 
            if (re.test(field.value)) {
              this.setStatus(field, null, "success")
            } else {
              this.setStatus(field, "Please enter a valid username", "error")
            }
          }

              // Proper name check
          if (field.id === "name") {
            // const re = /\D+$/i ;
            // accepting only name space name space name space name etc. 
            const re = /^[a-z.\s]+$/i ;
            if (re.test(field.value)) {
              this.setStatus(field, null, "success")
              } else {
              this.setStatus(field, "Please enter a valid name", "error")
              }
          }

          if (field.id === "cnp") {
            const re = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/ ;
            if (re.test(field.value)) {
              this.setStatus(field, null, "success")
              } else {
              this.setStatus(field, "Please enter a valid cnp", "error")
              }
          }

        }
    
    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success")
      } else {
        this.setStatus(field, "Please enter valid email address", "error")
      }
    }
    
    // Password confirmation edge case
    if (field.id === "password_confirmation") { 
      const passwordField = this.form.querySelector('#password')
    
      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error")
      } else if (field.value != passwordField.value)  {
        this.setStatus(field, "Password does not match", "error")
      } else {
        this.setStatus(field, null, "success")
      }
    }


  }

  setStatus(field, message, status) {
    // const successIcon = field.parentElement.querySelector('.icon-success')
    // const errorIcon = field.parentElement.querySelector('.icon-error')
    // const errorMessage = field.parentElement.querySelector('.error-message')
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
      field.style.cssText = errStyle ;
      field.nextElementSibling.innerHTML = message;
      field.nextElementSibling.nextElementSibling.innerHTML = badIcon;
    }    
  }
}

const form = document.querySelector('.form');
const fields = ["username", "email", "password", "password_confirmation", "name", "sex", "birthdate", "cnp", "gdpr"];

const validator = new FormValidator(form, fields);
validator.initialize();

//static reusable stuff! 
// class element {};
// const err1 = "Error - missing input";
// const err2 = "Error - not enough characters. Min char: ";
// const err3 = "DUDE? Don't you know passwords should match???";

//  var okIcon = document.createElement('span');
//  okIcon.textContent = "check_circle" ;
//  okIcon.setAttribute('class','icon-success material-icons md-18');
//  var badIcon = document.createElement('span');
//  badIcon.textContent = "remove_circle_outline";
//  badIcon.setAttribute('class','icon-error material-icons md-18');

// function clearMessages() {
//   var els = document.getElementsByClassName("error-message");
//   for(var i = 0; i < els.length; i++)
//   {
//       els.innerHTML = "";
//   }

//   var els2 = document.getElementsByClassName("icon");
//   for(var i = 0; i < els.length; i++)
//   {
//       els.innerHTML = "";
//   }
  

// }