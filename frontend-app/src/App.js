import { Route, Routes } from "react-router-dom";
import CustomerSignUp from "./customer/auth/customerSIgnUp";
import SignUp from "./customer/auth/signUp";
import { Toaster } from "react-hot-toast";
import Login from "./customer/auth/customerLogin";
import MangerSignup from "./manger/autnetication/mangerSignup";
import MangerLogin from "./manger/autnetication/mangerLogin";
import ManagerHome from "./manger/components/mangerHome";
import LogoutPage from "./customer/auth/logOutPage";
import UpdateRestaurent from "./manger/components/updateRestaurent";
import ViewMenu from "./manger/components/viewMenu";
import AddMenu from "./manger/menu/addMenu";
import UpdateMenu from "./manger/menu/updateMenu";
import CustomerHome from "./customer/components/customerHome";
import CustomerMenu from "./customer/components/custonerMenu";
import { CartProvider } from "./context/contextCart";
import CartPage from "./customer/components/cartPage";
import OrderPage from "./customer/components/orderpage";
import MyOrdersPage from "./customer/components/customerOrdes";



function App() {
  return (
    <div className=" bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <CartProvider>
        <Routes>
          <Route path="/" element={<CustomerSignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager-signup" element={<MangerSignup />} />
          <Route path="/manager-login" element={<MangerLogin />} />
          <Route path="/manager-home" element={<ManagerHome />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/update/:id" element={<UpdateRestaurent />} />
          <Route path="/viewmenu/:id" element={<ViewMenu />} />
          <Route path="/add/:id" element={<AddMenu />} />
          <Route path="/updatemenu/:id" element={<UpdateMenu />} />
          <Route path="/customerHomepage" element={<CustomerHome />} />
          <Route path="/customermenu/:id" element={<CustomerMenu />} />
          <Route path="/cartpage" element={<CartPage/>}/>
          <Route path="/orderpage" element={<OrderPage/>}/>
          <Route path='/myorders' element={<MyOrdersPage/>}/>
        </Routes>
      </CartProvider>
      <Toaster />
    </div>
  );
}

export default App;
