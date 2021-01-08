
enum Role {ADMIN,READ_ONLY,AUTHOR};

const person: { 
    name: string; 
    age: number; 
    hobbies: string[];
    role:[number,string] 
} = {
    name: 'Premendra',
    age: 30,
    hobbies: ['Reading', 'Sleeping'],
    role:[1,'Admin']
};

console.log(person);


for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase())
}