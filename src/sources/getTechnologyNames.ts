interface PackageResult {
  score: {final: number}
  package: {name: string}
}

export async function getNodePackages(
  query?: string | null
): Promise<string[]> {
  const endpoint = `https://registry.npmjs.org/-/v1/search?size=250&text=${
    query || '%22%22'
  }`

  const response = await fetch(endpoint)
  const result = (await response.json()) as {objects: PackageResult[]}

  return result.objects
    .sort((a, b) => a.score.final - b.score.final)
    .map((o) => o.package.name)
}

const clean = (word: string) => word.replace(/@\w+\//g, '')

export function generateTechStack(target: string, pkgs: string[]): string[] {
  const result: string[] = []
  const words = [...pkgs]

  for (const char of target.toLowerCase()) {
    // Try to find perfect matches first.
    let i = words.findIndex((w) => clean(w).startsWith(char))

    // Else, opt for fuzzy-searching.
    if (i === -1) i = words.findIndex((w) => clean(w).includes(char))

    // Otherwise, returns an empty array.
    if (i === -1) return []

    result.push(words[i])
    words.splice(i, 1) //?
  }

  return result
}
