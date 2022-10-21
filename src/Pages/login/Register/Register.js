import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Register = () => {
  const { creatUser, updateUserProfile, emailVerify } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, photoURL, email, password);
    creatUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        setError("");
        form.reset();
        handleUpdateUserProfile(name, photoURL);
        handleEmailVerify();
        toast.success("please check your email and do verify");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };
  const handleAccepted = (event) => {
    setAccepted(event.target.checked);
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => {});
  };

  const handleEmailVerify = () => {
    emailVerify()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Your name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control name="photoURL" type="text" placeholder="Photo URL" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          onClick={handleAccepted}
          type="checkbox"
          label={
            <>
              Accept <Link to="/terms">Term and Condition</Link>
            </>
          }
        />
      </Form.Group>
      <p>
        <Form.Text className="text-warning fw-bold">{error}</Form.Text>
      </p>

      <Button variant="primary" type="submit" disabled={!accepted}>
        Register
      </Button>
    </Form>
  );
};

export default Register;
