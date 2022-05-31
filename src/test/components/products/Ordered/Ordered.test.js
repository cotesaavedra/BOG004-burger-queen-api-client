import React, { useState } from 'react';
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ordered from '../../../../components/products/Ordered/Ordered';

describe('Testeo componente Ordered', () => {
    const productsMock = [
        {
            'dateEntry': '2022-03-05 15:14:10',
            'id': 1,
            'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
            'name': 'Sandwich de jamón y queso',
            'price': 1000,
            'quantity': 5,
            'type': 'Desayuno'
        }
    ];
    test('renderiza una tabla', () => {
        render(
            <Ordered products={productsMock} ></Ordered>
        );
        const table = screen.queryByTestId('table')
        expect(table).toBeInTheDocument();
    });
    // test('al presionar el boton de borrar se elimina el producto', () => {
        // const remove = jest.fn()
    //     remove.mockResolvedValue({ loggedIn: true });
        // render(
        //     <Ordered products={productsMock} ></Ordered>
        // );
        // const removedProduct = [
        //     {
        //         'dateEntry': '2022-03-05 15:14:10',
        //         'id': 1,
        //         'image': 'https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg',
        //         'name': 'Sandwich de jamón y queso',
        //         'price': 1000,
        //         'quantity': 0,
        //         'type': 'Desayuno'
        //     }
        // ];
    //     const btnDelete = screen.queryByTestId('btn-remove');
    //     fireEvent.click(btnDelete);
    //     expect(remove).toHaveBeenCalledTimes(1)

    // })
})