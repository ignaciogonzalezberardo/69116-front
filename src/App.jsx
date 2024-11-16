import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

import AdminUser from "./pages/admin-user/AdminUser";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Login2 from "./pages/login2/Login";
import AdminProduct from "./pages/admin-product/AdminProduct";
import Acerca from "./pages/acerca/Acerca";
import ProductDetail from "./pages/product-detail/ProductDetail";
import OrderDialog from "./components/order-dialog/OrderDialog";
import './App.css'
import Layout from "./layout/Layout";
import AdminGuard from "./guard/AdminGuard";

export default function App() {

  return (
    <>

      <OrderDialog />


      
        <Routes>
        <Route path="/login2" element={<Login2 />}/>

        <Route path="/" element={<Layout/>}>
        <Route path="/login" element={ <Login /> } />

       
            <Route index element={ <Home />  } />
            <Route path="product-detail/:id" element={<ProductDetail/>}/>
            <Route path="contact" element={ <Contact /> } />
            <Route  path="admin-product" 
                  element={ <AdminGuard>
                      <AdminProduct/>
                  </AdminGuard> } 
            />
            <Route path="acerca" element={ <Acerca /> } />
            <Route path="admin-user" element={ <AdminUser/> } />

        


        </Route>

          
            <Route path="*" element={<h1>Not Found</h1>} />

        </Routes>

    </>
  )
}
