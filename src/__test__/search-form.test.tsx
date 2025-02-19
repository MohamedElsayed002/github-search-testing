import { render , screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import SearchForm from '@/components/form/search-form'
import { toast, useToast } from '@/hooks/use-toast'

const mockToast = vi.fn()
const setUserNameMock = vi.fn()

vi.mock('@/hooks/use-toast',() => ({
    useToast: () => ({
        toast: mockToast
    })
}))

describe('Search Form', () => {
    const user = userEvent.setup()
    beforeEach(() => {
        vi.clearAllMocks()
    })

    function getFormElements() {
        const input = screen.getByRole('textbox', {name : /search/i})
        const button = screen.getByRole('button', {name : /search/i})
        return {input,button}
    }

    test('renders the search form correctly',() => {
        render(<SearchForm username='john_doe' setUserName={setUserNameMock} />)
        const {input,button} = getFormElements()
        expect(input).toHaveValue('john_doe')
        expect(button).toBeInTheDocument()
    })

    test('displays empty input when userName is empty',() => {
        render(<SearchForm username='' setUserName={setUserNameMock} />)
        const {input} = getFormElements()
        expect(input).toHaveValue('')
    })

    test('updates input value on change', async () => {
        render(<SearchForm username='' setUserName={setUserNameMock} />)
        const {input} = getFormElements()
        await user.type(input,'john_doe')
        expect(input).toHaveValue('john_doe')
    })

    test('shows toast when submitting empty input', async () => {
        render(<SearchForm username='' setUserName={setUserNameMock} />)
        const {button} = getFormElements()
        await user.click(button)
        expect(mockToast).toHaveBeenCalledWith({
            title : 'Enter user name please'
        })
        expect(setUserNameMock).not.toHaveBeenCalled()
    })

    test('calls setUserName on Valid form submission', async () => {
        render(<SearchForm username='' setUserName={setUserNameMock} />)
        const {input,button} = getFormElements()
        await user.type(input,'john_doe')
        await user.click(button)
        expect(setUserNameMock).toHaveBeenCalledWith('john_doe')
        expect(mockToast).not.toHaveBeenCalled()
    })
})