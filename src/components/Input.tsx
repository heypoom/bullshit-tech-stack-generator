interface Props {
  label?: string
  placeholder?: string
  className?: string
  value: string
  onChange: (value: string) => void
}

export const Input = (props: Props) => {
  const {className, value, onChange, label, placeholder} = props

  return (
    <div className="space-y-2">
      {label && <div className="text-2xl">{label}</div>}

      <input
        placeholder={placeholder || label}
        className={`text-3xl bg-slate-300 text-slate-700 px-5 py-1 rounded-full ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
