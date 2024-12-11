import React from 'react'

const page = ({params}: { params: { slug: string } }) => {
  return (
    <div>page{params.slug}</div>
  )
}

export default page