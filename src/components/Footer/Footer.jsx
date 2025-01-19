import React from "react";
import "../../blocks/footer.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="footer">
        <p className="footer__copyright">© 2024 Around The U.S.</p>
      </footer>
    );
  }
}

export default Footer;
