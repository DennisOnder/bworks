import React from "react";
import AuthDrawer from "./imports/AuthDrawer";

const openDrawer = e =>
  (document.getElementById(`auth__drawer__${e.target.name}`).style.display =
    "flex");

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <p>bworks</p>
        <div>
          <button name="register" onClick={openDrawer}>
            Register
          </button>
          <button name="login" onClick={openDrawer}>
            Log In
          </button>
        </div>
        <AuthDrawer type="login" />
        <AuthDrawer type="register" />
      </header>
    </div>
  );
};

export default Landing;
