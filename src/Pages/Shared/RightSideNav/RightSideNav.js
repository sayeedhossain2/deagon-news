import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";

import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaWhatsapp,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import BrandCarousel from "../BrandCarousel/BrandCarousel";

const RightSideNav = () => {
  const { providerLogin } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();

  // email add handling function
  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <ButtonGroup vertical>
        <Button
          onClick={handleGoogleSignIn}
          className="mb-2"
          variant="outline-primary"
        >
          <FaGoogle /> Login With Google
        </Button>
        <Button variant="outline-dark">
          <FaGithub /> Login With Github
        </Button>
      </ButtonGroup>

      <div className="mt-4">
        <h5>Find us On</h5>

        <ListGroup>
          <ListGroup.Item className="mb-2">
            <FaFacebook /> Facebook
          </ListGroup.Item>

          <ListGroup.Item className="mb-2">
            <FaWhatsapp /> Whatsapp
          </ListGroup.Item>

          <ListGroup.Item className="mb-2">
            <FaTwitter /> Twitter
          </ListGroup.Item>

          <ListGroup.Item className="mb-2">
            <FaTwitch /> Twitch
          </ListGroup.Item>

          <ListGroup.Item className="mb-2">
            <FaGoogle /> Porta ac consectetur ac
          </ListGroup.Item>
        </ListGroup>
      </div>

      {/* carousel */}
      <div>
        <BrandCarousel></BrandCarousel>
      </div>
    </div>
  );
};

export default RightSideNav;
