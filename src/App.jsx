import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/login";
import CityList from "./components/CityList";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="app" element={<AppLayout />} >
                    <Route index element={<CityList />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="countries" element={<p>Country list here</p>} />
                    <Route path="form" element={<p>Form here</p>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
