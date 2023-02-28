import React from "react";
import classes from "./HeroSection.module.scss";
import logo from "../images/cart.svg";

function HeroSection() {
  return (
    <div className={classes.heroSection}>
      <div className={classes.container}>
        <div>
          <h1>Everything you need at one place</h1>
          <p>shop now</p>
        </div>
        <img src={logo} alt="cart" />
      </div>
    </div>
  );
}

export default HeroSection;