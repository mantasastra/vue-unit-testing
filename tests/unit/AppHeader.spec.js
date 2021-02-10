import { render, screen } from '@testing-library/vue'
import AppHeader from '@/components/AppHeader'

describe('AppHeader', () => {
  test('show logout button if user is logged in ', () => {
    render(AppHeader, {
      data() {
        return {
          loggedIn: true,
        }
      },
    })

    expect(screen.getByTestId('logout-button')).toBeInTheDocument()
  })

  test('do not show logout button if user is not logged in', () => {
    render(AppHeader)

    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument()
  })
})
