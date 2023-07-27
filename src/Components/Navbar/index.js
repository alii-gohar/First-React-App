import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup,
} from "mdb-react-ui-kit";

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("login"));
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

  const Login = () => {
    navigate("/");
  };
  const Logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userName");
    navigate("/");
  };
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">POSTS  </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="/home">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/viewposts">TimeLine</MDBNavbarLink>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
                <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                  Disabled
                </MDBNavbarLink>
              </MDBNavbarItem> */}
            </MDBNavbarNav>
            {isLogin === null ? (
              <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
                <MDBBtn outline onClick={Login}>
                  Login
                </MDBBtn>
              </MDBInputGroup>
            ) : (
              <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
                <MDBBtn outline onClick={Logout}>
                  Logout
                </MDBBtn>
              </MDBInputGroup>
            )}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
