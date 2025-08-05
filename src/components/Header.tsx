import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '@theme/ThemeContext';
import { Logo } from "@components/Logo";
import { selectSelectedPokemons, clearSelected } from '@features/compare/compareSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const selected = useAppSelector(selectSelectedPokemons);
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <header>
      <Navbar
        bg={theme}
        variant={theme}
        expand="lg"
        className="sticky-top shadow-sm"
      >
        <Container fluid="sm">
          <Navbar.Brand as={Link} to="/">
            <Logo />
          </Navbar.Brand>
          <Button
            variant="link"
            className="navbar-toggler custom-toggler"
            aria-controls="main-navbar"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? <FaTimes size={24}/> : <FaBars size={24}/>}
          </Button>
          <Navbar.Collapse id="main-navbar" className="justify-content-end">
            <Nav className="d-flex align-items-center gap-2">
              {selected.length > 0 && (
                pathname !== '/compare' ? (
                  <Nav.Link as={Link} to="/compare" tabIndex={0}>
                    {selected.length} in Comparison
                  </Nav.Link>
                ) : (
                  <Nav.Link disabled>
                    {selected.length} in Comparison
                  </Nav.Link>
                )
              )}
              {selected.length > 0 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  aria-label="Clear comparison selection"
                  onClick={() => dispatch(clearSelected())}
                  tabIndex={0}
                >
                  Clear Comparison
                </Button>
              )}
              <Button
                variant="outline-secondary"
                size="sm"
                aria-label="Toggle theme"
                onClick={toggleTheme}
                tabIndex={0}
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
