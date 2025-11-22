var userInput;
// let userInput: any;
var userName;
userInput = 5;
userInput = 'Prem';
// userName=userInput;
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('An Error Occured!', 500);
