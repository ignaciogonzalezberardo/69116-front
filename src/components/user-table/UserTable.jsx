import './UserTable.css';
import UserRow from '../user-row/UserRow';

export default function AdminTable({ users, deleteUser, handleEditUser }) {
  return (
    <div className='contenedor'> 
    <table className="admin-table">
       <thead>
        <tr>
          
          <th>Nombre</th>
          <th>Mail</th>
          <th>Contraseña</th>
          <th>Fecha de ingreso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => {
            return (
              <UserRow
                key={user._id}
                user={user}
                deleteUser={deleteUser}
                handleEditUser={handleEditUser}
              />
            );
          })
        }
      </tbody> 


    </table>
    </div>
  );
}
