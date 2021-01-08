abstract class People{
    abstract displayDate():void;
}

// let peopleClass=new People();
// peopleClass.displayDate();

class Kids extends People{
    displayDate(){
        console.log("some data of kids")
    }
}

let kidsClass=new Kids();
kidsClass.displayDate();