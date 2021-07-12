import { forwardRef } from 'react'

 const TextInput = forwardRef(({ name, id, onChange, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      onChange={onChange}
      type="text"
      name={name}
      id={id}
      className={className}
      {...props}
    />
  )
})

export default TextInput