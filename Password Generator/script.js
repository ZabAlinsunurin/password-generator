const password_ele = document.getElementById("pwd_txt");
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
const pwd_length = document.getElementById("slider");
const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');

const string = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "@#$%^&*",
    spaces: " ",
};

generate.addEventListener('click', generatePassword);
clipboard.addEventListener('click', copyPassword);

function generatePassword() {
    // Check if any checkboxes are checked
    const checkboxesChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    if (!checkboxesChecked) {
        alert("Please select at least one option before generating the password.");
        return; // Exit the function if no checkboxes are checked
    }

    const final_string = Object.keys(string).filter(key => document.getElementById(key).checked).map(key => string[key]).join('');
    
    // Check if only spaces or exclude duplicates are selected
    const spacesChecked = document.getElementById("spaces").checked;
    const excludeDuplicatesChecked = document.getElementById("exclude-duplicates").checked;

    if (spacesChecked && !excludeDuplicatesChecked) {
        alert("You cannot select only spaces. Please select additional options.");
        return; // Exit the function if only spaces are selected
    }

    if (!spacesChecked && excludeDuplicatesChecked) {
        alert("You cannot select exclude duplicates without including spaces. Please select additional options.");
        return; // Exit the function if only exclude duplicates are selected
    }

    // Proceed with password generation
    let password = "";
    for (let i = 0; i < pwd_length.value; i++) {
        let pwd = final_string[Math.floor(Math.random() * final_string.length)];
        password += pwd;
    }
    
    password_ele.innerText = password;
}



function copyPassword() {
    navigator.clipboard.writeText(password_ele.innerText);
    alert("Password copied to clipboard");
}

// Hide the password initially
password_ele.innerText = "";

generate.addEventListener('click', () => {
    generatePassword();
});
