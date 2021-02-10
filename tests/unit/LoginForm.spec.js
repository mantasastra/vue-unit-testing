import { render, screen } from '@testing-library/vue'
import user from '@testing-library/user-event'
import LoginForm from '@/components/LoginForm'

describe('LoginForm', () => {
  test('emits an event with user data payload', () => {
    const mockName = '__NAME__'
    const { emitted } = render(LoginForm)

    const nameInput = screen.getByRole('textbox')
    expect(nameInput).toBeInTheDocument()

    user.type(nameInput, mockName)
    user.click(screen.getByRole('button', { name: /submit/i }))

    expect(emitted()).toEqual({
      formSubmitted: [[{ name: mockName }]],
    })
  })
})
