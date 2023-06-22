import {it, expect} from 'vitest'
import {generateTechStack} from './getTechnologyNames'

it('should generate a stack name from given word', () => {
  const s = generateTechStack('arse', [
    'domino',
    'parry',
    'arduino',
    'raytheon',
    'elm',
    'sox',
  ]).join(' ')

  expect(s).toBe('arduino raytheon sox elm')
})
