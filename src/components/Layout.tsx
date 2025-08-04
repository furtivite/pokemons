import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />

    <main className="flex-grow-1 py-4">
      <Container>
        {children}
      </Container>
    </main>

    <Footer />
  </div>
);
