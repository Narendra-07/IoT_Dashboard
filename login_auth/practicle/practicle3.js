function ValidateEmail(inputText) {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]) |(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  
    if (inputText.value.match(mailformat)) {
        alert("You have entered a valid email address!"); //The pop up alert for a valid email address
        document.form1.text1.focus();
        return true;
    }
    else {
        alert("You have entered an invalid email address!"); //The pop up alert for an invalid email address
        document.form1.text1.focus();
        return false;
    }
}
