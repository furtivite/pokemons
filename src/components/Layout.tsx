import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "@components/Header";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />

    <main className="flex-grow-1 py-4">
      <Container>
        <h1>Layout works</h1>
        {children}
      </Container>
    </main>

    <footer className="bg-light text-center py-3 mt-auto">
      <Container>
        <p>©&nbsp;{new Date().getFullYear()}</p>
        <p>
          Author of the project:{' '}
          <a href="https://github.com/furtivite" target="_blank" rel="noopener noreferrer">
            FRTVT
          </a>
        </p>
        <small>All trademarks belong to their respective owners. Educational project only.</small>
      </Container>
    </footer>
  </div>
);
