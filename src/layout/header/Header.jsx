import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faBars, faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons"
import './Header.css';
import { useOrder } from "../../context/OrderContex";
import { useUser } from "../../context/UserContex";


export default function Header() {
  const{setToggleModal, count}=useOrder()
  const {user,logout}=useUser()
  return (
    <header className="main-header">
      <nav className="main-nav">


        <div className="menu"> 
        <input type="checkbox" id="check" />
  <label htmlFor="check" className="checkbtn">
    <FontAwesomeIcon icon={faBars} className="fa-solid fa-bars"/> 
  </label>

  
        <ul> 
       
        <li className="nav-item">
          <NavLink className="nav-link" to='/'>Principal</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/contact'>Contacto</NavLink>
        </li>

     {   
     user?.role==="admin"&&
        <li className="nav-item">
          <NavLink className="nav-link" to='/admin-product'>Admin Product</NavLink>
          </li>}
      {        
        user?.role==="admin"&&
          <li className="nav-item">
          <NavLink className="nav-link" to='/admin-user'>admin user</NavLink>
        </li>}
          <li>
            <NavLink className="nav-link " to='/acerca'>Creador</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to='/login'>Register</NavLink></li>
{
  user?       ( 
    <li className="nav-item">
          <NavLink className="nav-link" onClick={logout} to='/'>logout</NavLink>
          </li>)
          
:(      
  <li className="nav-item">
  <NavLink className="nav-link" to='/login2'>Login</NavLink>
</li> )}

        </ul>
        </div>
              <div className="usuario">
                <div className="order">
                  <div className="order-count">
                    {count}
                  </div>
                  <FontAwesomeIcon icon={faCartShopping} className="fa-solid fa-cart-shopping"
                  onClick={()=>setToggleModal(estado=>!estado)}/>
                </div>

    {user?.name|| "tu"}
      <i className="fa-solid fa-user" /> 
      <FontAwesomeIcon icon={faUser}/>
</div>

      </nav>

    </header>
  )
}


    {/* <input type="checkbox" id="check">
    <label for="check" class="checkbtn">
        <i class="fa-solid fa-bars"></i>
    </label> */}
    

{/* <div class="usuario">
    <i class="fa-solid fa-cart-shopping"></i>
    <p>Tu</p>
    <i class="fa-solid fa-user"></i>
     */}
    

