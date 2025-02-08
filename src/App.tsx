import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from "./api";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./app.scss";
import { Route, Routes, useNavigate } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Store from "./pages/Store/Store";
import Analytics from "./pages/Analytics/Analytics";
import Orders from "./pages/Orders/Orders";

export const RedirectToDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  useEffect(() => {
    const userId = user?.sub; // Fetch user ID dynamically (e.g., from auth context)
    if (userId) {
      navigate(`/dashboard/${userId}`, { replace: true });
    }
  }, [user]);

  return null; // Prevent rendering anything
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setAccessTokenInLocalStorage();
  }, [isAuthenticated]);

  const setAccessTokenInLocalStorage = async () => {
    if (isAuthenticated) {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem("accessToken", accessToken);
      const response = await axiosInstance.post("/auth/client", {
        userInfo: {
          firstName: user?.given_name,
          lastName: user?.family_name,
          email: user?.email,
          sessionToken: localStorage.getItem("sessionToken"),
        },
      });
      alert(JSON.stringify(response));
      localStorage.setItem("sessionToken", response.data.token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  return (
    <div id="app-wrapper" className={theme ?? "light-mode"}>
      <div id="nav-wrapper">
        <Navbar setTheme={setTheme} currentTheme={theme ?? "light-mode"} />
      </div>
      <div id="content-wrapper">
        <Routes>
          <Route path="/" element={<RedirectToDashboard />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/management/products/:userId" element={<Products />} />
          <Route path="/management/store/:userId" element={<Store />} />
          <Route path="/management/analytics/:userId" element={<Analytics />} />
          <Route path="/management/orders/:userId" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
