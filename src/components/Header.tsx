import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '@theme/ThemeContext';
import { Logo } from "@components/Logo";
import { selectSelectedPokemons, clearSelected } from '@features/compare/compareSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const selected = useAppSelector(selectSelectedPokemons);
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar
      bg={theme}
      variant={theme}
      expand="lg"
      className="sticky-top shadow-sm"
    >
      <Container fluid="sm">
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
            {pathname !== '/compare' ? (
                <Nav.Link
                  as={Link}
                  to="/compare"
                  className="p-0"
                >
                  {selected.length} in Comparison
                </Nav.Link>
              ) : (
                <div>{selected.length} in Comparison</div>
            )}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => dispatch(clearSelected())}
            >
              Clear Comparison
            </Button>
          </Nav>
        )}
        <Button
          variant="outline-secondary"
          size="sm"
          className="ms-2"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
      </Container>
    </Navbar>
  );
};
