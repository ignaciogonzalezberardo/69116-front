import './UserRow.css';

export default function UserRow({ user, deleteUser, handleEditUser }) {
  const passwordLength = 5;
  return (
    <tr className="admin-table-row">

      <td className="name">
        {user.name}
      </td>
      <td className="mail-container">
        {user.email}
      </td>
       <td className="password">
     
        {"*".repeat(Math.min(user.password.length, passwordLength))}
        {user.password.length > passwordLength && "..." } 
      </td>
      <td className="date">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="actions">
        <div className="actions-container">
          <button className="btn" onClick={() => handleEditUser(user)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
