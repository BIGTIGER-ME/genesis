import { Client, Server } from 'styletron-engine-monolithic'
import { STYLETRON_HYDRATE_KEY } from 'constants/styles'

type NestedObject = {
  [key: string]: unknown | NestedObject
}

export function convertObjectToCssVars(obj: NestedObject, prefix: string = '--theme'): [string, string][] {
  const result: [string, string][] = []
  function toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }
  function processObject(subObj: NestedObject, currentPrefix: string): void {
    for (const key in subObj) {
      const value = subObj[key]
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processObject(value as NestedObject, `${currentPrefix}-${toKebabCase(key)}`)
      } else if (!Array.isArray(value)) {
        result.push([`${currentPrefix}-${toKebabCase(key)}`, (value as any).toString()])
      }
    }
  }

  processObject(obj, prefix)

  return result
}

export const styletron =
  typeof window === 'undefined'
    ? new Server()
    : new Client({ hydrate: document.getElementsByClassName(STYLETRON_HYDRATE_KEY) })
