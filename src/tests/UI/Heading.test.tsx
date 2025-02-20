import { Heading } from '@/components/UI/Heading';
import { render, screen } from '@testing-library/react';

describe('Heading ui component', () => {
    test('Отображение текста', () => {
        render(<Heading text='Hello' color='#fff' weight='600' align='center' />)

        const heading = screen.getByText("Hello")
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveStyle(`
            color: #fff;
            font-weight: 600;
            text-align: center;
        `)
    })
})