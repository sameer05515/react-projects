import React, { useState } from 'react'

function HookCounterTwo() {
    const initialValue=0;
    const [count, setCount]=useState(initialValue);
    return ( 
        <div> 

            Count : {count} <br/>
            <button onClick={()=>setCount(()=>initialValue)}>Reset</button> <br/>
            <button onClick={()=>setCount((prev)=>prev+1)}>Increase</button> <br/>
            <button onClick={()=>setCount((prev)=>prev-1)}>Decrease</button> <br/>
            <button onClick={()=>setCount((prev)=>prev+5)}>Plus 5</button> <br/>

        </div>
    )
}

export default HookCounterTwo;