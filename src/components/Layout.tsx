import React from "react";
import { Alert, Container } from "react-bootstrap";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { MAX_COMPARE, selectSelectedPokemons } from "@features/compare/compareSlice";
import { useAppSelector } from "../store";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const selected = useAppSelector(selectSelectedPokemons);

  return(
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 py-4">
        <Container>
          {selected.length >= MAX_COMPARE && (
            <Alert variant="warning" className="mb-4">
              You have reached the maximum of {MAX_COMPARE} Pokémon for comparison.
            </Alert>
          )}
          {children}
        </Container>
      </main>

      <Footer />
    </div>
  )
};
