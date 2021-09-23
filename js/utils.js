function clearMessages() {
    var els = document.getElementsByClassName("error-message");
    for(var i = 0; i < els.length; i++)
    {
        els.innerHTML = "";
    }
  
    var els2 = document.getElementsByClassName("icon");
    for(var i = 0; i < els.length; i++)
    {
        els.innerHTML = "";
    }
    
  
  }