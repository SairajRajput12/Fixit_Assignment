import React from 'react'

export default function Form({children,className,onSubmit}) {
  return (
    <form className={className} onSubmit={onSubmit}>{children}</form>
  )
}
