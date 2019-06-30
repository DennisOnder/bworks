import React from "react";
import AuthDrawer from "./imports/AuthDrawer";

function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <p>bworks</p>
        <AuthDrawer type="login" />
        <AuthDrawer type="register" />
      </header>
    </div>
  );
}

export default Landing;
