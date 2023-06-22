import {useAtom} from 'jotai'
import {motion} from 'framer-motion'

import {bullshitStackAtom, stackNameAtom} from '../atoms'

export function StackList() {
  const [stackName] = useAtom(stackNameAtom)
  const [packages] = useAtom(bullshitStackAtom)

  if (!packages) return null

  return (
    <div>
      <div className="text-2xl px-6 py-3 border-2 rounded-xl border-slate-600 font-mono">
        <span className="text-slate-300">pnpm install </span>

        {packages.map((name, pkgIndex) => {
          let found = false

          return (
            <span key={pkgIndex}>
              {name.split('').map((char, charIndex) => {
                if (!found && stackName.toLowerCase()?.[pkgIndex] === char) {
                  found = true

                  return (
                    <span key={charIndex}>
                      <b>{char}</b>
                    </span>
                  )
                }

                return (
                  <span className="text-gray-500" key={charIndex}>
                    {char}
                  </span>
                )
              })}
              &nbsp;
            </span>
          )
        })}
      </div>
    </div>
  )
}
