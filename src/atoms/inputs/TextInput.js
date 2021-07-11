export default function Input({ name, id, onChange, className, ...props }) {
  return (
    <input
      onChange={onChange}
      type="text"
      name={name}
      id={id}
      className={className}
      {...props}
    />
  )
}