import { render, screen } from '@testing-library/vue'
import MessageContainer from '@/components/MessageContainer'

describe('MessageContainer', () => {
  test('wraps MessageDisplay component', () => {
    const mockMessage = '__MESSAGE__'

    render(MessageContainer, {
      stubs: {
        MessageDisplay: {
          template: `<p data-testid="message">${mockMessage}</p>`,
        },
      },
    })

    expect(screen.getByText(mockMessage)).toBeInTheDocument()
  })
})
