import React from 'react'
import MiscellaneousExamples from '../miscelleneous/misc/MiscellaneousExamples'
import ToggleablePanel from '../../common/components/ToggleablePanel'

const PlaygroundBase = () => {
  return (
    <>
      <ToggleablePanel showContent={false} title='Aim for Playground base compoent'>
        <h1>Purpose: </h1>
        <ul>
          <li>To test any compoent (especially custom component, built within TweetApp ) independently</li>
        </ul>
      </ToggleablePanel>
      <MiscellaneousExamples />
    </>
  )
}

export default PlaygroundBase