import React from 'react'

export const Inputs = ({input,index,page,handleInput}) => {
    return (
        <div key={page+index.toString()} className="d-flex justify-content-center align-items-center inputBox">
            {input.icon}
            <input type={input.type} placeholder={input.placeholder} name={input.name} value={input.value} onChange={handleInput} />
        </div>
    )
}
