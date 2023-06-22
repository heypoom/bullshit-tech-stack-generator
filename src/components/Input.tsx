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
      {label && <div className="text-lg text-slate-300 ml-4">{label}</div>}

      <input
        placeholder={placeholder || label}
        className={`text-3xl bg-transparent px-5 py-1 rounded-full border-2 border-slate-600 focus-visible:outline-yellow-400 focus-visible:shadow-lg placeholder-slate-500 ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
