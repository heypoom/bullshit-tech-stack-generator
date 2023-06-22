import {useReducer} from 'react'
import {useAtom} from 'jotai'

import {packagesAtom} from '../atoms'

export function PackageList() {
  const [shown, toggle] = useReducer((n) => !n, false)
  const [packages] = useAtom(packagesAtom)

  if (!packages) return null

  return (
    <div>
      <button onClick={toggle} className="text-slate-500">
        {shown ? 'hide' : 'show'} npm packages
      </button>

      {shown && (
        <div className="text-xs text-slate-400 mt-2">
          <span>{packages.length} libraries loaded: </span>

          {packages.map((name) => (
            <span key={name}>{name} </span>
          ))}
        </div>
      )}
    </div>
  )
}
