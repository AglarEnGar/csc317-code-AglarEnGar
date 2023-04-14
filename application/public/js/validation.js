function validateUsername(username, password, passwordconfirm){

    var letters = /^[A-Za-z]+$/;
    try {
        if(username) {
            if(username[0].match(letters)){
                console.log('valid');        
                if (username.length >= 3) {
                    console.log('valid');
                    document.getElementById("submitverif").style.color = "green";
                    document.getElementById("submitverif").innerHTML = "All parts of the form are completed!";
                }else{
                    console.log("invalid");
                    document.getElementById("submitverif").style.color = "red";
                    document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
                }
            }else{
                console.log("invalid");
                document.getElementById("submitverif").style.color = "red";
                document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
            }
        } else {
            console.log("invalid");
            document.getElementById("submitverif").style.color = "red";
            document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
        }    
    } catch {
        console.log(error);
    }
 

    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let countA =0;
    let count1 = 0;
    let countsp = 0;
    try{
        for(let value of password) {
            if(value.match(letters)){
                if(value == value.toUpperCase()){
                    ++countA;
                }
            }
            if(!isNaN(value)){
                ++count1;
            }
            if(specialCharacters.test(value)) {
                ++countsp;
            }
        }
    }catch{
        console.log(error);
    }

    try{
        if(password.length < 8){
            console.log("invalid");
            document.getElementById("submitverif").style.color = "red";
            document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
        }else {
            console.log('valid');
            document.getElementById("submitverif").style.color = "green";
            document.getElementById("submitverif").innerHTML = "All parts of the form are completed!";
            if(countA >= 1){
                console.log('valid');
                document.getElementById("submitverif").style.color = "green";
                document.getElementById("submitverif").innerHTML = "All parts of the form are completed!";
                if(count1 >= 1){
                    console.log('valid');
                    document.getElementById("submitverif").style.color = "green";
                    document.getElementById("submitverif").innerHTML = "All parts of the form are completed!";
                    if(countsp >= 1){
                        console.log('valid');
                        document.getElementById("submitverif").style.color = "green";
                        document.getElementById("submitverif").innerHTML = "All parts of the form are completed!";
                        if(passwordconfirm == password){   
                            console.log('valid');
                            document.getElementById("submitverif").style.color = "green";
                            document.getElementById("submitverif").innerHTML = "All parts of the form are completed!";
                        } else {
                            console.log("invalid");
                            document.getElementById("submitverif").style.color = "red";
                            document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
                        }
                    } else {
                        console.log("invalid");
                        document.getElementById("submitverif").style.color = "red";
                        document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
                    }
                } else {
                    console.log("invalid");
                    document.getElementById("submitverif").style.color = "red";
                    document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
                }
            }else{
                console.log("invalid");
                document.getElementById("submitverif").style.color = "red";
                document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
            }
        }
    }catch{
        console.log(error);
    }
    
    if(document.getElementById("age").checked){
        console.log('valid');
        document.getElementById("submitverif").innerHTML = "*";
        document.getElementById("submitverif").style.color = "green";
    }else{
        console.log("invalid");
        document.getElementById("submitverif").style.color = "red";
        document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
    }

    
    if(document.getElementById("tos").checked){
        console.log('valid');
        document.getElementById("submitverif").style.color = "green";
        document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
    }else{
        console.log("invalid");
        document.getElementById("submitverif").style.color = "red";
        document.getElementById("submitverif").innerHTML = "All parts of the form must be completed";
    }

}

document.getElementById("usernameR").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget;
    let usernameR = userInput.value;
    var letters = /^[A-Za-z]+$/;
    if(usernameR[0].match(letters)){
        console.log('valid');
        document.getElementById("usernameverif").style.color = "green";
        document.getElementById("usernameverif").innerHTML = "Good Username";
        
        if (usernameR.length >= 3) {
            console.log('valid');
            document.getElementById("usernameverif").style.color = "green";
            document.getElementById("usernameverif").innerHTML = "Good Username";
        }else{
            console.log("invalid");
            document.getElementById("usernameverif").style.color = "red";
            document.getElementById("usernameverif").innerHTML = "Username must be 3 or more alphanumerical characters";
        }
    }else{
        console.log("invalid");
        document.getElementById("usernameverif").style.color = "red";
        document.getElementById("usernameverif").innerHTML = "Username must start with an alphabetical character";
    }
    

});

document.getElementById("passwordR").addEventListener("input", function (ev) {
    let userInput=ev.currentTarget;
    let passwordR = userInput.value;
    var letters = /^[A-Za-z]+$/;
    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let countA =0;
    let count1 = 0;
    let countsp = 0;
    for(let value of passwordR) {
        if(value.match(letters)){
            if(value == value.toUpperCase()){
                ++countA;
            }
        }
        if(!isNaN(value)){
            ++count1;
        }
        if(specialCharacters.test(value)) {
            ++countsp;
        }
    }
    if(passwordR.length < 8){
        console.log("invalid");
        document.getElementById("passverif").style.color = "red";
        document.getElementById("passverif").innerHTML = "Password must be 8 or more characters long";

    }else {
        console.log('valid');
        document.getElementById("passverif").style.color = "green";
        document.getElementById("passverif").innerHTML = "Good Password";
        if(countA >= 1){
            console.log('valid');
            document.getElementById("passverif").style.color = "green";
            document.getElementById("passverif").innerHTML = "Good Password";
            if(count1 >= 1){
                console.log('valid');
                document.getElementById("passverif").style.color = "green";
                document.getElementById("passverif").innerHTML = "Good Password";
                if(countsp >= 1){
                    console.log('valid');
                    document.getElementById("passverif").style.color = "green";
                    document.getElementById("passverif").innerHTML = "Good Password";
                } else {
                    console.log("invalid");
                    document.getElementById("passverif").style.color = "red";
                    document.getElementById("passverif").innerHTML = "Password must have one special character";
                }
            } else {
                console.log("invalid");
                document.getElementById("passverif").style.color = "red";
                document.getElementById("passverif").innerHTML = "Password must have one number";
            }
        }else{
            console.log("invalid");
            document.getElementById("passverif").style.color = "red";
            document.getElementById("passverif").innerHTML = "Password must have one capital letter";
        }
    }
});

document.getElementById("passwordconfirm").addEventListener("input", function (ev) {
    if(ev.currentTarget.value == document.getElementById('passwordR').value){
        console.log('valid');
        document.getElementById("confirmpassverif").style.color = "green";
        document.getElementById("confirmpassverif").innerHTML = "Passwords Match";
    } else {
        console.log("invalid");
        document.getElementById("confirmpassverif").style.color = "red";
        document.getElementById("confirmpassverif").innerHTML = "Passwords must match"; 
    }
});
document.getElementById("agecheckverif").style.color = "red";
document.getElementById("agecheckverif").innerHTML = "*";
document.getElementById("TOS verif").style.color = "red";
document.getElementById("TOS verif").innerHTML = "*";
document.getElementById('age').addEventListener('change', () =>  {
    if(document.getElementById("age").checked){
        console.log('valid');
        document.getElementById("agecheckverif").innerHTML = "*";
        document.getElementById("agecheckverif").style.color = "green";
    }else{
        console.log("invalid");
        document.getElementById("agecheckverif").style.color = "red";
        document.getElementById("agecheckverif").innerHTML = "*";
    }
});

document.getElementById('tos').addEventListener('change', () => {
    if(document.getElementById("tos").checked){
        console.log('valid');
        document.getElementById("TOS verif").style.color = "green";
        document.getElementById("TOS verif").innerHTML = "*";
    }else{
        console.log("invalid");
        document.getElementById("TOS verif").style.color = "red";
        document.getElementById("TOS verif").innerHTML = "*";
    }
});
document.getElementById('submitR').addEventListener("click", function (ev) {
    if(ev.currentTarget.value){
        validateUsername(document.getElementById("usernameR").value, document.getElementById("passwordR").value, document.getElementById("passwordconfirm").value);
    }
});