


function creatingelements (domobject) {
    
  // Parent 
  let el = domobject;
  // New Element
  const newEl = document.createElement("div");

  // Insert Before Element
  el.before(newEl);

  // Insert After Element
  el.after(newEl);

  // Just remember you cant use .after() or .before()
  // after either is already called.
  // You cant place one element in two places at once.

  // Another feature of ChildNode is the .remove() method,
  // which deletes the element from the DOM
  el.remove();
  newEl.remove();
}

function msgprint() {
  // alert("You have Successfully Called the JavaScript function");
  
  let nextSibling= document.getElementById("username").nextSibling;
  let nextElementSibling= document.getElementById("username").nextElementSibling;
  console.log(nextSibling);
  console.log(nextElementSibling);
  /* add text to next element of specific id */
  document.getElementById("username").nextElementSibling.appendChild(document.createTextNode(err1)) ;

  /* Red border around error input*/
  document.getElementById("username").style.cssText = "border:1px solid red";




  // const label = document.querySelector('.label');
  // css(label, {
  // 'background-color': 'yellow',
  // color: 'red'
  // });

}

function confirmation () {
  return true;
}

function focusevent() {
  element = document.activeElement;
  if (element.value.trim() != "") {
      console.log(element);
      console.log("Selected DOM Element is: " + element.id);
      console.log("its value is: " + element.value);

      switch (element.id) {
          case "username": 
              console.log("I'm in Username switch-case"); 
          break;

          case "password" :
              console.log("I just got password");
          break;

          case ("firstname" || "lastname"):
              console.log("f or l name");
          break;

          case "password_confirmation":
              if (element.value !== document.getElementById("password").value) {
                  element.style.cssText = errStyle ;
                  element.nextElementSibling.innerHTML = err3;
                  element.nextElementSibling.nextElementSibling.innerHTML = badIcon;
              }
              else {
                  element.style.cssText = 
                  element.nextElementSibling.innerHTML = "";
                  element.nextElementSibling.nextElementSibling.innerHTML = okIcon;
              }
          break;
      }
  }


}

function lostfocusevent() {
  console.log("Previously selected DOM Element was: " + element.id);
  console.log("its value was: " + element.value);

  switch (element.id) {
      case "username": 
          console.log("I'm in Username switch-case"); 
      break;

      case "password" :
          console.log("I just got password");
      break;

      case ("firstname" || "lastname"):
          console.log("f or l name");
      break;

      case "password_confirmation":
          console.log("i am in password confirmation");
          if (element.value !== document.getElementById("password").value) {
              console.log("and the password confirmation doesn't match");
              element.style.cssText = errStyle ;
              element.nextElementSibling.innerHTML = err3;
              element.nextElementSibling.nextElementSibling.innerHTML = badIcon;
          }
          else {
              // element.nextElementSibling.appendChild(document.createTextNode());
              element.nextElementSibling.nextElementSibling.innerHTML = okIcon;
          }
      break;
  }


}

//static reusable stuff! 
class element {};
const err1 = "Error - missing input";
const err2 = "Error - not enough characters. Min char: ";
const err3 = "DUDE? Don't you know passwords should match???";

const errStyle = "border:1px solid red";
const okStyle = "border:0px";
//  var okIcon = document.createElement('span');
//  okIcon.textContent = "check_circle" ;
//  okIcon.setAttribute('class','icon-success material-icons md-18');
const okIcon = '<span class="icon-success material-icons md-18" >check_circle</span>';
//  var badIcon = document.createElement('span');
//  badIcon.textContent = "remove_circle_outline";
//  badIcon.setAttribute('class','icon-error material-icons md-18');
const badIcon = '<span class="icon-error material-icons md-18" >remove_circle_outline</span>';

function validateOnSubmit() {
    let self = this;
    var els = document.getElementsByClassName("myClass");
      for(var i = 0; i < els.length; i++)
      {
        console.log(els[i]);
      }
        self.validateFields(input);
   
    
  }

function validateFields(field) {
 
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
              this.setStatus(field, null, "success");
            } else {
              this.setStatus(field, "Please enter a valid username", "error");
            }
          }

              // Proper name check
          if (field.id === "name") {
            // const re = /\D+$/i ;
            // accepting only name space name space name space name etc. 
            const re = /^[a-z.\s]+$/i ;
            if (re.test(field.value)) {
              this.setStatus(field, null, "success");
              } else {
              this.setStatus(field, "Please enter a valid name", "error");
              }
          }

          if (field.id === "cnp") {
            const re = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/ ;
            if (re.test(field.value)) {
              this.setStatus(field, null, "success");
              } else {
              this.setStatus(field, "Please enter a valid cnp", "error");
              }
          }

        }
    
    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Please enter valid email address", "error");
      }
    }
    
    // Password confirmation edge case
    if (field.id === "password_confirmation") { 
      const passwordField = this.form.querySelector('#password');
    
      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error");
      } else if (field.value != passwordField.value)  {
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


  };

function setStatus(field, message, status) {
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
  };

const form = document.querySelector('.form');
const fields = ["username", "email", "password", "password_confirmation", "name", "cnp", "sex", "birthdate", "gdpr"];





