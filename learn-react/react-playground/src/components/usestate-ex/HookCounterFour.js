import React, { useState } from 'react'

function HookCounterFour() {
  const [items, setItem]= useState([]);
  const addItem= ()=>{
    setItem(prev=>([...prev,{
      id: items.length,
      name: Math.floor(Math.random()*100)+1
    }]))
  }
  return (
    <div>
      <button onClick={addItem}>Add</button>
      <ul>
        {
          items.map(
            item=>(
              <li key={item.id}>{item.name}</li>
            )
          )
        }
      </ul>

      <h2>{JSON.stringify(items)}</h2>

    </div>
  )
}

export default HookCounterFour