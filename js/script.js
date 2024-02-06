function toTop(){
    var main = document.getElementById("main");
    main.scrollIntoView({ behavior: "smooth" });
}

function changeImage(id, newSrc) {
    document.getElementById(id).src = newSrc;
}

function changeBg(){
    var index = document.getElementById('color').selectedIndex;
    document.getElementById('wrapper').style.backgroundColor = document.getElementById('color').options[index].value;
}

function site(val){
    window.open(val, "_blank");
}

function getSelectedCountry(){
    var selectedCountry = document.getElementById('conCountry');
    var index = selectedCountry.selectedIndex;
    selectedCountry = selectedCountry.options[index].value;
    return selectedCountry;
}

function pref(name) {
    var txt = "";
    for(i=0; i<document.getElementsByName(name).length; i++){
        if(document.getElementsByName(name)[i].checked){
            txt += document.getElementsByName(name)[i].value + " | ";
        }
    }
    return txt;
}

function saveContactDetails(){
    var fullname = document.getElementById('conName').value;
    var age = document.getElementById('conAge').value;
    var birthDate = document.getElementById('conDOB').value;
    var phoneNo = document.getElementById('conTel').value;
    var selectedCountry = getSelectedCountry();
    var selectedGender = document.querySelector('input[name="conGender"]:checked').value;
    var emailAddress = document.getElementById('conEmail').value;
    var website = document.getElementById('conWeb').value;
    var message = document.getElementById('conMessage').value;
    var selectedContact = pref("conContact");

    if(fullname == "" || age == "" || birthDate == "" || phoneNo == "" || emailAddress == "" || website == "" || message == ""){
        alert("Please fill up all the required fields");
        return;
    }
    else{
        if(!validatePhoneNo(phoneNo)){
            alert("Phone number format not matched");
            document.getElementById('conTel').focus();
        }
        else if(!validateEmail(emailAddress)){
            alert("Email format not matched");
            document.getElementById('conEmail').focus();
        }
        else if(!validateWeb(website)){
            alert("URL format not matched");
            document.getElementById('conWeb').focus();
        }
        else{
            localStorage.setItem("conName", fullname);
            localStorage.setItem("conAge", age);
            localStorage.setItem("conDOB", birthDate);
            localStorage.setItem("conTel", phoneNo);
            localStorage.setItem("conCountry", selectedCountry);
            localStorage.setItem("conGender", selectedGender);
            localStorage.setItem("conEmail", emailAddress);
            localStorage.setItem("conWeb", website);
            localStorage.setItem("conMessage", message);
            localStorage.setItem("conContact", selectedContact);
        
            window.location.href = "form.html";
        }
    }
}

function displayConDetails(){
    var fullname = localStorage.getItem("conName");
    var age = localStorage.getItem("conAge");
    var birthDate = localStorage.getItem("conDOB");
    var phoneNo = localStorage.getItem("conTel");
    var selectedCountry = localStorage.getItem("conCountry");
    var selectedGender = localStorage.getItem("conGender");
    var emailAddress = localStorage.getItem("conEmail");
    var website = localStorage.getItem("conWeb");
    var selectedContact = localStorage.getItem("conContact");
    var message = localStorage.getItem("conMessage");

    document.getElementById('resultConName').innerHTML = "Name : " + fullname;
    document.getElementById('resultConAge').innerHTML = "Age : " + age;
    document.getElementById('resultConDOB').innerHTML = "Date of Birth : " + birthDate;
    document.getElementById('resultConTel').innerHTML = "Mobile Number : " + phoneNo;
    document.getElementById('resultConCountry').innerHTML = "Country : " + selectedCountry;
    document.getElementById('resultConGender').innerHTML = "Gender : " + selectedGender;
    document.getElementById('resultConEmail').innerHTML = "Email : " + emailAddress;
    document.getElementById('resultConWeb').innerHTML = "Personal / Company Website : " + website;
    document.getElementById('resultConContact').innerHTML = "Preffered method of contact : " + selectedContact;
    document.getElementById('resultConMessage').innerHTML = "Message : " + message;
}

function displayGuest(){
    var selectedSite = pref("guestSite");
    var selectedGender = document.querySelector('input[name="guestGender"]:checked').value;
    var fname = document.getElementById('guestFName').value;
    var lname = document.getElementById('guestLName').value;
    var address = document.getElementById('guestAddress').value;
    var emailAddress = document.getElementById('guestEmail').value;
    var message = document.getElementById('guestComment').value;

    if(fname == "" || lname == "" || address == "" || emailAddress == "" || message == ""){
        alert("Please fill up all the required fields");
        location.reload();
    }
    else{
        if(validateEmail(emailAddress)){
            document.getElementById("resultGuestFName").innerHTML = "First Name: " + fname;
            document.getElementById("resultGuestLName").innerHTML = "Lirst Name: " + lname;
            document.getElementById("resultGuestAddress").innerHTML = "Address: " + address;
            document.getElementById("resultGuestGender").innerHTML = "Gender: " + selectedGender;
            document.getElementById("resultGuestEmail").innerHTML = "Email: " + emailAddress;
            document.getElementById("resultGuestComment").innerHTML = "Comment: " + message;
            document.getElementById("resultGuestSite").innerHTML = "Favourite Site : " + selectedSite;
            document.getElementById("resultDate").innerHTML = "Date: " + showDate();
            document.getElementById("result").style.display = "block";
        }
        else{
            alert("Email format not matched");
            document.getElementById('guestEmail').focus();
        }
    }
}

function resetDisplay(){
    document.getElementById("result").style.display = "none";
}

function showDate(){
    var d = "";
    d = new Date();
    var date = d.getDate();
    var mon = d.getMonth() + 1;
    var year = d.getFullYear();

    return date + '/' + mon + '/' + year;
}

function validateEmail(email){
    var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(email.match(emailRegex)){
        return true;
    }
    else{
        return false;
    }
}

function validatePhoneNo(phoneNo){
    var msPhoneFormat = /^01[0-9]-[0-9]{7,}$/;
    if(phoneNo.match(msPhoneFormat)){
        return true;
    }
    else{
        return false;
    }
}

function validateWeb(weblink){
    var linkFormat = /^(http|https):\/\/[^ "]+$/;
    if(weblink.match(linkFormat)){
        return true;
    }
    else{
        return false;
    }
}