import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from "@components/Logo";

export const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Navbar bg="light" expand="lg" className="sticky-top shadow-sm">
      <Container>
        <Navbar.Brand>
          {pathname === '/' ? (
            <Logo />
          ) : (
            <Link to="/">
              <Logo />
            </Link>
          )}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
