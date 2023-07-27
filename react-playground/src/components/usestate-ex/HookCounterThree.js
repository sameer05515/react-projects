import React, { useState } from 'react'

function HookCounterThree() {
    const [name, setName] = useState({ firstName: '', lastName: '' });
    return (
        <div>
            <input type="text" value={name.firstName} onChange={
                (event) => {
                    setName(
                        (prev) => ({ ...prev, firstName: event.target.value })
                    )
                }
            } />
            <input type="text" value={name.lastName} onChange={
                (event) => {
                    setName(
                        (prev) => ({ ...prev, lastName: event.target.value })
                    )
                }
            } />
            <h2>Your first name is: {name.firstName}</h2>
            <h2>Your last name is: {name.lastName}</h2>
            <h2>{JSON.stringify(name)}</h2>
        </div>
    )
}

export default HookCounterThree;