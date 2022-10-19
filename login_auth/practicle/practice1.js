function validate(formvalue)
{
    // var pattern=/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    var pattern=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(formvalue.value.match(pattern))
    {
        alert("enter email is validated");
        document.form1.text1.focus();
        return true;
    }
    else{
        alert("invalid email");
        document.form1.text1.focus();
        return false;
    }
}