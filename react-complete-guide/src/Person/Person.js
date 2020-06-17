import React, { Component } from 'react';

class Person extends Component {

    state={
        persons:[
            {name:'Premendra',age:29},
            {name:'Vandana',age:26},
            {name:'Narendra',age:27}
        ]

        
    };


    render(){
        return (
            <div>Premendra</div>
        );
    };

}

export default Person;