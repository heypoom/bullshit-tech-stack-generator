import {Suspense} from 'react'
import {useAtom} from 'jotai'

import {Input} from './Input'
import {StackList} from './StackList'
import {PackageList} from './PackageList'

import {searchQueryAtom, stackNameAtom} from '../atoms'

import '../App.css'

function App() {
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [stackName, setStackName] = useAtom(stackNameAtom)

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto my-5 space-y-4 w-full">
        <h1 className="text-4xl">Bullshit tech stack generator 🤪</h1>

        <Suspense>
          <div className="space-y-4">
            <Input
              label="Name your text stack ✍🏻"
              placeholder="bullshit"
              value={stackName}
              onChange={setStackName}
              className="uppercase"
            />

            <Input
              label="NPM Criteria"
              value={query ?? ''}
              onChange={setQuery}
              placeholder="author:saltyaom"
            />
          </div>
        </Suspense>

        <Suspense>
          <StackList />
          <PackageList />
        </Suspense>
      </div>
    </div>
  )
}

export default App
