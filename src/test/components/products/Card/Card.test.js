import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../../../components/products/card/Card';

describe('Testeando el componente Card', () => {
    test('returnCounter debe actualizar el estado', async () => {
        const products = [
            {
                'dateEntry': '2022-03-05 15:14:10',
                'id': 1,
                'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
                'name': 'Sandwich de jamón y queso',
                'price': 1000,
                'quantity': 0,
                'type': 'Desayuno'
            }
        ];
        // const value = 1;
        render(<Card products={products} />)
        const name = screen.getByText('Sandwich de jamón y queso');
        expect(name).toBeInTheDocument();
        const price = screen.getByText('$1000');
        expect(price).toBeInTheDocument();
        const counter = screen.getByText(0);
        expect(counter).toBeInTheDocument();
    })

})