function closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none" ;
    modal.textContent="";
}

function okay() {
    let myform = document.getElementById("f1");

    let overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    let overlaycontent = document.createElement("div");
    overlaycontent.innerHTML = '<div class="modal-header"><span class="close" onclick="closeOverlay()">&times;</span><h2>Notification</h2></div><div class="modal-body"><p>Ok. I am sending the data to the server...</p></div>'
    overlaycontent.setAttribute("class","modal-content");

    overlay.appendChild(overlaycontent);

    let time = 5000;
    timeoutOverlay = setTimeout(closeOverlay,time);
    // console.log(timeoutOverlay);
   // document.getElementById("overlaybody").innerHTML+= "this window will close in " + time + " miliseconds";
    ClearFields();
}

function closeOverlay() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    overlay.textContent="";
    closeModal();
}


 

let timeoutOverlay = null;



function ClearFields() {
    const form = document.querySelector('#f1');
    const fields = ["username", "email", "password", "password_confirmation", "name", "cnp", "bday", "gdpr"];

    this.form = form;
    this.fields = fields;
    form.reset();

    let self = this;
    this.fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        input.style.cssText = "";
        input.nextElementSibling.innerHTML = "";
        
    })


}
 

  
