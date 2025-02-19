import { render , screen} from '@testing-library/react'
import StatsCard from '@/components/user/stats-card'

describe('StatsCard' , () => {
    test('renders title and count correctly', () => {
        render(<StatsCard title='Total Users' count={42} />)
        expect(screen.getByText('Total Users')).toBeInTheDocument()
        expect(screen.getByText('42')).toBeInTheDocument()
    })

    test('renders with zero count', () => {
        render(<StatsCard title='Total Users' count={0} />)
        expect(screen.getByText('Total Users')).toBeInTheDocument()
        expect(screen.getByText('0')).toBeInTheDocument()
    })

    test('renders with large numbers', () => {
        render(<StatsCard title='Total Users' count={10000000000000} />)
        expect(screen.getByText('10000000000000')).toBeInTheDocument()
    })
})