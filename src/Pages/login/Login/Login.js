import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Login = () => {
  const { signIn, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setError("");
        form.reset();

        if (user.emailVerified) {
          navigate(from, { replace: true });
        } else {
          toast.error("your email is not verifyed");
        }
      })

      .catch((error) => {
        console.error(error);
        setError(error.message);
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" />
      </Form.Group>

      <p>
        <Form.Text className="text-warning fw-bold">{error}</Form.Text>
      </p>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
