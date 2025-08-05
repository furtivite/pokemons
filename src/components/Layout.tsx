import React, { useEffect, useState } from "react";
import { Alert, Container, Toast, ToastContainer } from "react-bootstrap";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { MAX_COMPARE, selectSelectedPokemons } from "@features/compare/compareSlice";
import { useAppSelector } from "../store";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const selected = useAppSelector(selectSelectedPokemons);
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    if (selected.length === MAX_COMPARE) {
      setShowToast(true);
    }
  }, [selected]);


  return(
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 py-4">
        <Container>
          <ToastContainer position="top-end" className="p-3">
            <Toast
              bg="warning"
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Comparison limit</strong>
              </Toast.Header>
              <Toast.Body className="text-dark">
                You have reached the maximum of {MAX_COMPARE} Pokémon for comparison.
              </Toast.Body>
            </Toast>
          </ToastContainer>
          {children}
        </Container>
      </main>

      <Footer />
    </div>
  )
};
