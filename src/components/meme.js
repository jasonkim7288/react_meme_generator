import React from 'react'


export const Meme = ({template, onClick, picWidth}) => {
  return (
    <div className="p-5">
      <img
        role="button"
        style={{width: `${picWidth}`, border: "2px solid", borderRadius: "10px"}}
        src={template.url}
        alt={template.name}
        onClick={onClick}
      />
    </div>
  )
}
