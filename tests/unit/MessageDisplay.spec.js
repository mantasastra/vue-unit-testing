import { render, screen, waitForElementToBeRemoved } from '@testing-library/vue'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import MessageDisplay from '@/components/MessageDisplay'

describe('MessageDisplay', () => {
  const server = setupServer(
    rest.get('http://localhost:3000/message', async (req, res, ctx) => {
      return res(ctx.json({ text: '__MESSAGE__' }))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('message is displayed after a successful call', async () => {
    render(MessageDisplay)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'))

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    expect(screen.getByTestId('message').innerHTML).toMatchInlineSnapshot(`
      "
          __MESSAGE__
        "
    `)
  })

  test('error message is displayed after an unsuccessful call', async () => {
    server.use(
      rest.get('http://localhost:3000/message', async (req, res, ctx) => {
        return res(ctx.status(400))
      })
    )

    render(MessageDisplay)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'))

    expect(screen.queryByTestId('message')).not.toBeInTheDocument()

    const errorMessage = screen.getByTestId('error-message')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage.innerHTML).toMatchInlineSnapshot(
      `"Oops! Something went wrong!"`
    )
  })
})
