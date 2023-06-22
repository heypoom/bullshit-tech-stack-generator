import {atom} from 'jotai'
import {atomWithCache} from 'jotai-cache'
import {deb} from 'async-debounce'

import {generateTechStack, getNodePackages} from './sources/getTechnologyNames'
import {asyncDebounce} from './utils/debounce'

export const stackNameAtom = atom('bullshit')
export const searchQueryAtom = atom<string | null>(null)

const getNodePackagesDebounced = asyncDebounce(getNodePackages, 500)

// TODO: debounce properly
export const packagesAtom = atomWithCache(async (get) => {
  return getNodePackagesDebounced(get(searchQueryAtom))
})

export const bullshitStackAtom = atom(async (get) => {
  const packages = await get(packagesAtom)

  try {
    return generateTechStack(get(stackNameAtom), packages ?? [])
  } catch (err) {
    return []
  }
})
