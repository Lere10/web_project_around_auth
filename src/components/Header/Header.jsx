import React from "react";
import "../../blocks/header.css";
import logo from "../../images/header__logo.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="header">
        <img src={logo} alt="Logo Around the USA" className="header__logo" />
        <hr className="header__line" />
      </header>
    );
  }
}

export default Header;
