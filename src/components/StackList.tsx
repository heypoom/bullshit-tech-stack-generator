import {useAtom} from 'jotai'

import {bullshitStackAtom, stackNameAtom} from '../atoms'

export function StackList() {
  const [stackName] = useAtom(stackNameAtom)
  const [packages] = useAtom(bullshitStackAtom)

  if (!packages) return null

  return (
    <div>
      <code className="text-2xl">
        <span className="text-slate-300">pnpm install </span>

        {packages.map((name, pkgIndex) => {
          let found = false

          return (
            <span key={pkgIndex}>
              {name.split('').map((char, charIndex) => {
                if (!found && stackName?.[pkgIndex] === char) {
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
      </code>
    </div>
  )
}
