let userInput: unknown;
// let userInput: any;
let userName: string;

userInput=5;
userInput='Prem';
// userName=userInput;

if(typeof userInput === 'string'){
    userName=userInput;
}


function generateError(message: string, code: number): never{
    throw {message: message, errorCode: code};
}

generateError('An Error Occured!',500);