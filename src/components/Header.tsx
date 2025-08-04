import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from "@components/Logo";
import { selectSelectedPokemons, clearSelected } from '@features/compare/compareSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const selected = useAppSelector(selectSelectedPokemons);
  const dispatch = useAppDispatch();

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
      {selected.length > 0 && (
        <Nav className="ms-auto d-flex align-items-center gap-2">
          <Nav.Link
            as={Link}
            to="/compare"
            className="p-0"
          >
            {selected.length} in Comparison 
          </Nav.Link>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => dispatch(clearSelected())}
          >
            Clear Comparison
          </Button>
        </Nav>
      )}
    </Container>
  </Navbar>
  );
};
