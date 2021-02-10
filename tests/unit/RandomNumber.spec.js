import { render, screen, waitFor } from '@testing-library/vue'
import user from '@testing-library/user-event'
import RandomNumber from '@/components/RandomNumber'

describe('RandomNumber', () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('by default randomNumber data should be 0', () => {
    render(RandomNumber)

    expect(screen.getByTestId('random-number').innerHTML).toContain(0)
  })

  test.each`
    min    | max    | randomValue | expectedResult
    ${1}   | ${10}  | ${0.5}      | ${6}
    ${200} | ${300} | ${0.5}      | ${250}
  `(
    'randomNumber data should be between $min and $max when a button is clicked',
    async ({ min, max, randomValue, expectedResult }) => {
      jest.spyOn(global.Math, 'random').mockReturnValue(randomValue)

      render(RandomNumber, {
        propsData: {
          min,
          max,
        },
      })

      expect(screen.getByTestId('random-number').innerHTML).toContain(0)
      await user.click(screen.getByTestId('generate-random-number'))

      await waitFor(() => screen.getByTestId('random-number'))

      expect(screen.getByTestId('random-number').innerHTML).toContain(
        expectedResult
      )
    }
  )
})
