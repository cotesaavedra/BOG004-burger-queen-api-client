import React from 'react'
import { Table } from 'react-bootstrap';
import { DeleteUser } from '../DeleteUser/DeleteUser';
import { EditUser } from '../EditUser/EditUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const ViewUsers = ({ users, setUsers, callUsers}) => {
    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th data-testid='user-email'>Email</th>
                        <th>Rol</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id} className='user'>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                {user.roles.admin &&
                                    <td>Administrador</td>
                                }
                                {user.roles.waiter &&
                                    <td>Mesero</td>
                                }
                                {user.roles.chef &&
                                    <td>Chef</td>
                                }
                                 <td><EditUser userToEdit={user} callUsers={callUsers} /></td>
                                 <td><FontAwesomeIcon icon={faTrash} /><DeleteUser users={users} setUsers={setUsers} /></td>
                                 
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}