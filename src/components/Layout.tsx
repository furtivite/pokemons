import React, { useEffect, useState } from "react";
import { Alert, Container, Toast, ToastContainer } from "react-bootstrap";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { LayoutToast } from "@components/LayoutToast";
import { MAX_COMPARE, selectSelectedPokemons } from "@features/compare/compareSlice";
import { useAppSelector } from "../store";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const selected = useAppSelector(selectSelectedPokemons);
  const [showToast, setShowToast] = useState(false);

  const closeToast = () => setShowToast(false);
  
  useEffect(() => {
    if (selected.length === MAX_COMPARE) {
      setShowToast(true);
    }
  }, [selected]);


  return(
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 py-4">
        <Container fluid="sm">
          <LayoutToast 
            bg="warning" 
            onClose={closeToast} 
            show={showToast} 
            title="Comparison limit" 
            text={`You have reached the maximum of ${MAX_COMPARE} Pokémon for comparison.`} 
          />
          {children}
        </Container>
      </main>

      <Footer />
    </div>
  )
};
