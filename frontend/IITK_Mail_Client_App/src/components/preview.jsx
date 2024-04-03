import React from 'react'
import parse from 'html-react-parser';

export const Preview = ({value}) => {
  return (
    <div>{parse(value)}</div>
  )
}
