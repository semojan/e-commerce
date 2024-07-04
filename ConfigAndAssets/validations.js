function validUserInput(email, pass, confirmPass, fullName, street, city){
    return (email &&
            email.includes("@") &&
            pass &&
            pass.trim().length >= 3 &&
            pass === confirmPass &&
            fullName &&
            street &&
            city);
}

module.exports = {
    validUserInput: validUserInput
};