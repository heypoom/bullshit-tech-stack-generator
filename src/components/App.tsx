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
    <div className="min-h-[100vh] flex flex-col items-center justify-center mx-6">
      <div className="max-w-5xl mx-auto my-5 space-y-8 w-full">
        <h1 className="text-4xl text-yellow-300">
          Bullshit tech stack generator 🤪
        </h1>

        <Suspense>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-y-6">
            <Input
              label="name your tech stack ✍🏻"
              placeholder="bullshit"
              value={stackName}
              onChange={setStackName}
            />

            <Input
              label="filter specific packages from npm"
              value={query ?? ''}
              onChange={setQuery}
              placeholder="keywords:vue"
            />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[200px]" />}>
          <div className="min-h-[200px] space-y-2">
            <StackList />
            <PackageList />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default App
