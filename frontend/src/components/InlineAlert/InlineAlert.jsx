import React from 'react'

const InlineAlert = ({message}) => {
  return (
      <div className='text-xs text-red-600'>
          {message}
    </div>
  )
}

export default InlineAlert