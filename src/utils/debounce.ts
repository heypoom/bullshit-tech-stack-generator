import {debounce} from 'lodash'

export function asyncDebounce<F extends (...args: any[]) => Promise<any>>(
  func: F,
  wait?: number
) {
  const resolveSet = new Set<(p: any) => void>()
  const rejectSet = new Set<(p: any) => void>()

  const debounced = debounce((args: Parameters<F>) => {
    func(...args)
      .then((...res) => {
        resolveSet.forEach((resolve) => resolve(...res))
        resolveSet.clear()
      })
      .catch((...res) => {
        rejectSet.forEach((reject) => reject(...res))
        rejectSet.clear()
      })
  }, wait)

  return (...args: Parameters<F>): ReturnType<F> =>
    new Promise((resolve, reject) => {
      resolveSet.add(resolve)
      rejectSet.add(reject)
      debounced(args)
    }) as ReturnType<F>
}
