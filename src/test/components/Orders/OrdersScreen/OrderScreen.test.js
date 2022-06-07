import React from 'react';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from '../../../auth/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { OrdersScreen } from '../../../../components/Orders/OrdersScreen/OrdersScreen';
import axios from 'axios';

//     test('Renderiza el componente', async () => {
//         const userMock = {
//             email: 'leidy.hopper@systers.xyz',
//         };
//         axios.post.mockResolvedValueOnce({
//             data: [{
//                 client: 'Juanita',
//                 id: 19,
//                 products: products
//             }],
//         });
//         render(
//             <Router>
//                 <AuthContext.Provider value={{
//                     user: userMock,
//                 }}>
//                     <OrdersScreen />
//                 </AuthContext.Provider>
//             </Router>
//         )

//         const ordersReady = screen.getByTestId('table-orders');
//         expect(ordersReady).toBeInTheDocument();
//     })
// })
