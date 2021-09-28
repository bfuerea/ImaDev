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
  
  
        if (self.allOK() == true) {
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
  
      /* Below line to be used when checking field values output. Also still struggling with whitespaces in several places OR username regex not good enough */
      // console.log ("checking " + field.id + " value: [" + field.value + "]");
      
      
      // Check presence of values
      if ((field.id != "gdpr") && (field.id != "bday") && (field.value.length <= 4)) {
        this.setStatus(field, `${field.id} hasn't got enough characters`, "error");
      } else if (field.value.length >= 255) {
        this.setStatus(field, `${field.id}'s text is too long`, "error");
      } else {
        
        // Proper Username check 
        if (field.id === "username") {
          // const re = /[a-zA-Z._0-9]*/;   
          const re = /[\w\d][^\W]/;
          if (re.test(field.value) && (!field.value.includes(' '))) {
            this.setStatus(field, null, "success");
          } else {
            this.setStatus(field, "Please enter a valid username", "error");
          }
        }
  
        // Proper name check
        if (field.id === "name") {
          // const re = /\D+$/i ;
          // accepting only name space name etc. 
          const re = /^[a-z.\s]+$/i;
          if (re.test(field.value)) {
            this.setStatus(field, null, "success");
          } else {
            this.setStatus(field, "Please enter a valid name", "error");
          }
        }
  
        if (field.id === "cnp") {
          this.checkcnp(field.value);
          const re = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/;
          if (re.test(field.value)) {
            if (this.checkcnp(field.value)) {
              this.setStatus(field, null, "success");
            }
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
  
  
        /* TODO: use function to make this password + password_confirmation check more readable and less code  */
        // Checking password combo 
        if (field.id === "password")  {
          const re = /(?=.*[<>!@#$%^&*])/;
          const passconfField = this.form.querySelector('#password_confirmation');
          if (re.test(field.value)) {
            this.setStatus(field, null, "success");
            if (passconfField.value != '') {
              if (passconfField.value != field.value) {
                this.setStatus(passconfField, "Password does not match", "error");
              } else {
                this.setStatus(passconfField, null, "success");
              }
            }
          } else {
            this.setStatus(field, "Password Not Strong Enough", "error");
          }
        }
  
        // Password confirmation edge case
        if (field.id === "password_confirmation") {
          const passwordField = this.form.querySelector('#password');
          if (passwordField.style.cssText === "border: 1px solid red;") {
            this.setStatus(field, "enter a valid password", "error");
          } else  if (field.value == "") {
            this.setStatus(field, "Password confirmation required", "error");
          } else if (field.value != passwordField.value) {
            this.setStatus(field, "Password does not match", "error");
          } else  {
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
          let dob = new Date(field.value) ;
          if (field.value === '') { 
            this.setStatus(field, "Please enter date", "error");
          } else if (this.calculate_age(dob) < 16) {
            this.setStatus(field, "Age must be over 16", "error");
          } else if (this.calculate_age(dob) > 120) {
            this.setStatus(field, "Are you sure you are still alive?", "error");
          } else { 
            this.setStatus(field, null, "success"); 
          }
        }
  
  
      }
  
  
    }
  
    setStatus(field, message, status) {
      const errmsgStyle = "color: red";  
      const errStyle = "border:1px solid red";
      const okStyle = "border:1px solid green";
      const okIcon = '<span class="icon-success material-icons md-18" style="color: green" >check_circle</span>';
      const badIcon = '<span class="icon-error material-icons md-18" style="color: red">remove_circle_outline</span>';
  
      if (status === "success") {
        field.style.cssText = okStyle;
        field.nextElementSibling.innerHTML = okIcon;
      }
  
      if (status === "error") {
        field.style.cssText = errStyle;
        field.nextElementSibling.innerHTML = message + badIcon;
        field.nextElementSibling.style.cssText = errmsgStyle;
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
      let condition = true;
      let self = this;
      this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);
        if (input.style.cssText === "border: 1px solid red;") {
          condition = false;
        }
      })
      return condition;
    }
  
    calculate_age(dob) { 
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms); 
    
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
  
    checkcnp (cnp) {
      let C = 0;   // calculated check digit C
      const x = "279146358279" ; // constant used for calculating check digit C
      /* turning them into list - this can be improved, probably*/
      let codelist = `${cnp}`.split('').map(Number) ;
      let xlist = `${x}`.split('').map(Number);
  
      let sum = 0; // initializing sum used in calculations
      /* calculating sum of product of digits */
      for (let i=0; i<xlist.length; i++) {
        sum += xlist[i] * codelist[i];
      }
      
      /* figuring out C */
      if (sum%11 > 10) {
        return false;
      } else if (sum%11 < 10) {
        C = sum%11;
      } else {
        C = 1;
      }
      
      /* and finally checking C against last digit in cnp */
      if (C === codelist[codelist.length-1]) {
        return true;
      } else {
        return false;
      }
    }
  
  }
  
  const form = document.querySelector('.form');
  const fields = ["username", "email", "password", "password_confirmation", "name", "cnp", "bday", "gdpr"];
  const validator = new FormValidator(form, fields);
  validator.initialize();
  