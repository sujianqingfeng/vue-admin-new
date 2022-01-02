import { expect, describe, it } from 'vitest'

import { deepMerge } from '../share'

describe('deepMerge', () => {
  it('happy path', () => {
    const target = {
      a: 1,
      b: {
        c: 1
      }
    }

    const source = {
      b: {
        c: 2,
        d: 4
      },
      c: 3
    }

    const result = {
      a: 1,
      b: {
        c: 2,
        d: 4
      },
      c: 3
    }

    const output = deepMerge(target, source)
    console.log(22222222)

    expect(output).toEqual(result)
  })

  it('merge array', () => {
    const target = [1, 2]

    const source = [3, 4]
    const result = [1, 2, 3, 4]

    const output = deepMerge(target, source)
    console.log(output)

    expect(output).toEqual(result)
  })
})
