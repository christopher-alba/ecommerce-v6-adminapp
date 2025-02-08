import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import "./navbar.scss";
import RouterLink from "../RouterLink/RouterLink";
import { faStore } from "@fortawesome/free-solid-svg-icons/faStore";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { faBoxes } from "@fortawesome/free-solid-svg-icons/faBoxes";
import { faLineChart } from "@fortawesome/free-solid-svg-icons/faLineChart";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import Button, { Theme } from "../Button/Button";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { faSignIn } from "@fortawesome/free-solid-svg-icons/faSignIn";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";

const Navbar: FC<{
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
  currentTheme: string;
}> = ({ setTheme, currentTheme }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const toggleTheme = () => {
    const lightModeText = "light-mode";
    const darkModeText = "dark-mode";
    const themeKey = "theme";
    if (currentTheme === lightModeText) {
      setTheme(darkModeText);
      localStorage.setItem(themeKey, darkModeText);
    } else {
      setTheme(lightModeText);
      localStorage.setItem(themeKey, lightModeText);
    }
  };
  return (
    <div id="navbar-main">
      <div>
        <h1 className="navbar-brand">TIMELESS</h1>
        <h4 className="navbar-subheading">Admin App</h4>
        <hr />
        <Button
          theme={Theme.SECONDARY}
          onClick={toggleTheme}
          icon={currentTheme === "light-mode" ? faMoon : faSun}
          fluid
          className="theme-switcher-button"
        >
          {currentTheme === "light-mode" ? "dark mode" : "light mode"}
        </Button>
      </div>

      {isAuthenticated && (
        <div className="navbar-links">
          <RouterLink
            path={`/management/store/${user?.sub}`}
            name="Store"
            iconProp={faStore}
          ></RouterLink>
          <RouterLink
            path={`/management/orders/${user?.sub}`}
            name="Orders"
            iconProp={faShoppingCart}
          ></RouterLink>
          <RouterLink
            path={`/management/products/${user?.sub}`}
            name="Products"
            iconProp={faBoxes}
          ></RouterLink>
          <RouterLink
            path={`/management/analytics/${user?.sub}`}
            name="Analytics"
            iconProp={faLineChart}
          ></RouterLink>
          <RouterLink
            path={`/dashboard/${user?.sub}`}
            name="Dashboard"
            iconProp={faHome}
          ></RouterLink>
        </div>
      )}
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user?.name || "User"}</h2>
          <Button
            onClick={() => logout()}
            theme={Theme.TERTIARY}
            icon={faSignOut}
            fluid
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            loginWithRedirect();
          }}
          theme={Theme.TERTIARY}
          icon={faSignIn}
          fluid
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
