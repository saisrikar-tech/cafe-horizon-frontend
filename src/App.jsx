import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import Desserts from "./Desserts";
import Cart from "./Cart";
import Menu from "./Menu";
import Breakfast from "./Breakfast";
import Soups from "./Soups";
import HotBeverages from "./HotBeverages";
import Drinks from "./Mocktails";
import Appetizers from "./Appetizers";
import Snacks from "./Snacks";
import Pizzas from "./Pizzas";
import Shakes from "./Shakes";
import Orders from "./Orders";
import Pastas from "./Pastas";
import Registration from "./Registration";
import Login from "./Login";
import Profile from "./Profile";
import LoginDialog from "./LoginDialog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Sonner toasts */}
      <Toaster
        position="top-center"
        richColors
        closeButton
        duration={2000}
        expand={true}
        visibleToasts={3}
        toastOptions={{
          style: { marginTop: "0px" }
        }}
      />
      {/* Global login dialog — controls itself via LoginSlice */}
      <LoginDialog />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/shakes" element={<Shakes />} />
        <Route path="/breakfasts" element={<Breakfast />} />
        <Route path="/soups" element={<Soups />} />
        <Route path="/hotBeverges" element={<HotBeverages />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/appetizers" element={<Appetizers />} />
        <Route path="/burgers" element={<Snacks />} />
        <Route path="/pizzas" element={<Pizzas />} />
        <Route path="/desserts" element={<Desserts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/pastas" element={<Pastas />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;