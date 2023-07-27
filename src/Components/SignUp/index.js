import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./index.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const RegisterUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    console.log();
    if (users[email] !== undefined) {
      setError("Email Already Exist");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      users[email] = [password, username];
      localStorage.setItem("users", JSON.stringify({ ...users }));

      console.log("users", users);
    }
    setEmail("");
    setPassword("");
    setUsername("");
  };
  return (
    <MDBContainer>
      <MDBCard className="text-black m-5 signUpCard">
        <h5>{error}</h5>
        <MDBCardBody className="d-flex align-items-center">
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center justify-content-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </h1>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label="Your Name"
                  id="form1"
                  type="text"
                  className="w-100 size-lg signUpInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  label="Your Email"
                  id="form2"
                  type="email"
                  className="w-100 size-lg signUpInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label="Password"
                  id="form3"
                  type="password"
                  className="w-100 size-lg signUpInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p>
                Already Have an Account? <Link to="/">SignIn</Link>
              </p>
              <MDBBtn className="mb-4" size="lg" onClick={RegisterUser}>
                Register
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;
