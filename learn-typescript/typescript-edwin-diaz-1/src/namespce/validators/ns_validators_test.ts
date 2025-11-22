import * as v from './namespaced_validators';

// Some samples to try
let strings1:string[] = ["Hello", "98052","845401", "101"];

// Validators to use
let validators1: { [s: string]: v.Validation.StringValidator } = {};
validators1["ZIP code in US"] = new v.Validation.ZipCodeValidator(5);
validators1["ZIP code in India"] = new v.Validation.ZipCodeValidator(6);
validators1["Letters only"] = new v.Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings1) {
  for (let name in validators1) {
    console.log(
      `"${s}" - ${
        validators1[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}