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
          if (self.allOK() == true){
            this.createModal();
          }
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
      } 
        
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
        const re = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/;
        if (re.test(field.value)) {
          let cnpCheck = this.checkcnp(field.value);
          if (cnpCheck === true) {
            this.setStatus(field, null, "success");
            const bdayfield = this.form.querySelector('#bday');
            const blocfield = this.form.querySelector('#bloc');
            bdayfield.value = this.extractBirthday(field);
            blocfield.value = this.extractLocation(field);
            // if ((this.checkbdaycnp() == false) && (bdayfield.value != "")){
            //   this.setStatus(bdayfield, "Date doesn't match CNP", "error");
            //}
          } else {
            this.setStatus(field, "Please enter a valid cnp", "error");
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
      // if (field.id === "bday") {
      //   let dob = new Date(field.value) ;
      //   if (field.value === '') { 
      //     this.setStatus(field, "Please enter date", "error");
      //   } else if (this.calculate_age(dob) < 16) {
      //     this.setStatus(field, "Age must be over 16", "error");
      //   } else if (this.calculate_age(dob) > 120) {
      //     this.setStatus(field, "Are you sure you are still alive?", "error");
      //   } else if ((this.checkbdaycnp() == false) && (document.getElementById("cnp").value != "")) {
      //       this.setStatus(field, "Date doesn't match CNP", "error")
      //   } else { 
      //     this.setStatus(field, null, "success"); 
      //   }
      // }


      
  
  
    }
          
    extractBirthday(cnp) {
      let yearDigits = cnp.value.substring(1,3);
      let monthDigits = cnp.value.substring(3,5);
      let dayDigits = cnp.value.substring(5,7);
      if (yearDigits.Number < 70) {
        yearDigits = "20" + yearDigits;
      } else {
        yearDigits = "19" + yearDigits;
      }

      let birthdate = yearDigits + "-" + monthDigits + "-" + dayDigits;
      return birthdate;
      
    }

    extractLocation(cnp) {
      let location = "";
      let locationCode = cnp.value.substring(7,9);
      // let completeList = this.initJson();
      const json ='[{"Cod":1,"Judet":"Alba"},{"Cod":2,"Judet":"Arad"},{"Cod":3,"Judet":"Argeș"},{"Cod":4,"Judet":"Bacău"},{"Cod":5,"Judet":"Bihor"},{"Cod":6,"Judet":"Bistrița-Năsăud"},{"Cod":7,"Judet":"Botoșani"},{"Cod":8,"Judet":"Brașov"},{"Cod":9,"Judet":"Brăila"},{"Cod":10,"Judet":"Buzău"},{"Cod":11,"Judet":"Caraș-Severin"},{"Cod":12,"Judet":"Cluj"},{"Cod":13,"Judet":"Constanța"},{"Cod":14,"Judet":"Covasna"},{"Cod":15,"Judet":"Dâmbovița"},{"Cod":16,"Judet":"Dolj"},{"Cod":17,"Judet":"Galați"},{"Cod":18,"Judet":"Gorj"},{"Cod":19,"Judet":"Harghita"},{"Cod":20,"Judet":"Hunedoara"},{"Cod":21,"Judet":"Ialomița"},{"Cod":22,"Judet":"Iași"},{"Cod":23,"Judet":"Ilfov"},{"Cod":24,"Judet":"Maramureș"},{"Cod":25,"Judet":"Mehedinți"},{"Cod":26,"Judet":"Mureș"},{"Cod":27,"Judet":"Neamț"},{"Cod":28,"Judet":"Olt"},{"Cod":29,"Judet":"Prahova"},{"Cod":30,"Judet":"SatuMare"},{"Cod":31,"Judet":"Sălaj"},{"Cod":32,"Judet":"Sibiu"},{"Cod":33,"Judet":"Suceava"},{"Cod":34,"Judet":"Teleorman"},{"Cod":35,"Judet":"Timiș"},{"Cod":36,"Judet":"Tulcea"},{"Cod":37,"Judet":"Vaslui"},{"Cod":38,"Judet":"Vâlcea"},{"Cod":39,"Judet":"Vrancea"},{"Cod":40,"Judet":"București"},{"Cod":41,"Judet":"București-Sector1"},{"Cod":42,"Judet":"București-Sector2"},{"Cod":43,"Judet":"București-Sector3"},{"Cod":44,"Judet":"București-Sector4"},{"Cod":45,"Judet":"București-Sector5"},{"Cod":46,"Judet":"București-Sector6"},{"Cod":51,"Judet":"Călărași"},{"Cod":52,"Judet":"Giurgiu"},{"Cod":47,"Judet":"Bucuresti-Sector7(desfiintat)"},{"Cod":48,"Judet":"Bucuresti-Sector8(desfiintat)"}]'
      const obj = JSON.parse(json);
      // console.log (obj[47].Judet + " - " + obj[47].Cod);
      
/* this allows to go through all keys in json example */
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // console.log("%c "+key + " = " + obj[key].Cod + " - " + obj[key].Judet);
            if (obj[key].Cod === parseInt(locationCode)) {
              location = obj[key].Judet;
            }
        }
      }

      // const keys = Object.keys(completeList);
      // keys.forEach((key, index) => {
      //   console.log(`${key}: ${completeList[key]}`);
      // });
      
      // location = completeList[0]["cod"];
      return location;

    }
      
    

  //   initJson() {
  //     this.loadJSON(function(response) {
  //      // Parse JSON string into object
  //        var actual_JSON = JSON.parse(response);
  //     });
  //    }
     

  //   loadJSON(callback) {   

  //     var xobj = new XMLHttpRequest();
  //         xobj.overrideMimeType("application/json");
  //     xobj.open('GET', 'data/cnpLocation.json', true); // Replace 'my_data' with the path to your file
  //     xobj.onreadystatechange = function () {
  //           if (xobj.readyState == 4 && xobj.status == "200") {
  //             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
  //             callback(xobj.responseText);
  //           }
  //     };
  //     xobj.send(null);  
  //  }
  
  //   checkbdaycnp() {
  //     let cnp = document.getElementById("cnp").value;
  //     let bday = document.getElementById("bday").value;
  //     let cnpDateDigits = cnp.substring(1, 7);
  //     let bdayDateDigits = bday.substring(2,4)+bday.substring(5,7)+bday.substring(8,10);
     
  //     if (cnpDateDigits === bdayDateDigits) {
  //         return true;
  //     } else {
  //         return false;
  //     }
  // }
  
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

      if (status === "clear") {
        field.style.cssText = "";
        field.nextElementSibling.innerHTML = "";
        field.nextElementSibling.style.cssText = "";
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
  