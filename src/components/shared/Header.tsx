import React from "react";
import "./Header.css";
import navLogo from "../../assets/images/logo.png";
import plusIcon from "../../assets/images/plus.svg";
import note from "../../assets/images/note.svg";
import shopping from "../../assets/images/shopping.svg";
import favoutie from "../../assets/images/favoutie.svg";
import avatar from "../../assets/images/avatar.svg";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

type INavItems = { name: string; link: string };
type IUserNavItems = { name: string; img: string; url: string };

const navItems: INavItems[] = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "about",
    link: "/about",
  },
  {
    name: "contact us",
    link: "/contact-us",
  },
];

const userNav: IUserNavItems[] = [
  {
    name: "note",
    img: note,
    url: "/note",
  },

  {
    name: "shopping",
    img: shopping,
    url: "/shopping",
  },

  {
    name: "favoutie",
    img: favoutie,
    url: "/favoutie",
  },

  {
    name: "avatar",
    img: avatar,
    url: "/avatar",
  },
];

export const Header = () => {
  return (
    <section id="top_header">
      <Navbar expand="lg">
        <Container>
          <Link to={"/"} className="navbar-brand">
            <img src={navLogo} className="img-fluid" alt="nav-logo" />
          </Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-lg-items-center ms-4">
              {navItems.map((item, index) => (
                <li key={index} className="nav-items">
                  <Link
                    to={item.link}
                    className="fw-semibold ff-poppins nav-link text-capitalize"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <Button className="gradient-icon d-flex align-items-center gap-3 fw-semibold fs-14 ff-poppins border-0 text-white ls93">
                <img src={plusIcon} className="" alt="icon" />
                Create Image
              </Button>
            </Nav>
            <Nav>
              <ul className="d-flex align-items-center list-unstyled">
                {userNav.map((navItem, index) => (
                  <li key={index} className="nav-items">
                    <Nav.Link
                      href={navItem.url}
                      className="fw-semibold ff-poppins text-capitalize"
                    >
                      {navItem.name === "avatar" ? (
                        <span className="d-flex gap-4 justify-content-center align-items-center">
                          <span>
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="11"
                                height="11"
                                rx="5.5"
                                transform="matrix(-1 0 0 1 11 0)"
                                fill="#26CECE"
                              />
                            </svg>
                          </span>
                          <span className="d-flex gap-2 align-items-center">
                            {navItem.name}
                            <img src={navItem.img} alt={navItem.name} />
                          </span>
                        </span>
                      ) : (
                        <img src={navItem.img} alt={navItem.name} />
                      )}
                    </Nav.Link>
                  </li>
                ))}
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};
