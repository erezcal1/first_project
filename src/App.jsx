/* eslint-disable no-unused-vars */
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/navbar.component";
import TestComponent from "./components/test.component";
import LoginPage from "./pages/login/Login.page";
import RegisterPage from "./pages/register/Register.page";
import ProductPage from "./pages/products/Products.page";
import UsersPage from "./pages/users/Users.page";

function App() {
  return (
    <div className="container">
      <Navbar></Navbar>
      <TestComponent></TestComponent>
      {/* <LoginPage></LoginPage> */}
      {/* <RegisterPage></RegisterPage> */}
      {/* <ProductPage></ProductPage> */}
      <UsersPage></UsersPage>
    </div>
  );
}

export default App;
