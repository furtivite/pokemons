import React, { useEffect, useRef, useState } from "react";
import { Container, ToastContainer } from "react-bootstrap";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { LayoutToast } from "@components/LayoutToast";
import { MAX_COMPARE, selectSelectedPokemons } from "@features/compare/compareSlice";
import { useAppSelector } from "../store";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const selected = useAppSelector(selectSelectedPokemons);
  const prevRef = useRef<string[]>([]);
  const [toasts, setToasts] = useState<
    { id: number; bg: string; title: string; text: string }[]
  >([]);

  useEffect(() => {
    const prev = prevRef.current;
    const curr = selected;

    if (curr.length > prev.length) {
      const added = curr.find((n) => !prev.includes(n))!;
      setToasts((t) => [
        ...t,
        {
          id: Date.now(),
          bg: "success",
          title: "Added to Comparison",
          text: `You added ${added} to comparison`,
        },
      ]);

      if (curr.length === MAX_COMPARE) {
        setTimeout(() => {
          setToasts((t) => [
            ...t,
            {
              id: Date.now() + 1,
              bg: "warning",
              title: "Limit Reached",
              text: `You have reached the maximum of ${MAX_COMPARE} Pokémon for comparison`,
            },
          ]);
        }, 500);
      }
    } else if (curr.length < prev.length) {
      const removed = prev.find((n) => !curr.includes(n))!;

      setToasts((t) => [
        ...t,
        {
          id: Date.now(),
          bg: "warning",
          title: "Removed from Comparison",
          text: `You removed ${removed} from comparison`,
        },
      ]);
    }

    prevRef.current = curr;
  }, [selected]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <a href="#main-content" className="visually-hidden-focusable">
        Skip to content
      </a>
      <Header />

      <main id="main-content" className="flex-grow-1 py-4">
        <Container fluid="sm">
          <ToastContainer position="top-end" className="p-3">
            {toasts.map(({ id, bg, title, text }) => (
              <LayoutToast
                key={id}
                bg={bg}
                title={title}
                text={text}
                show={true}
                onClose={() =>
                  setToasts((t) => t.filter((toast) => toast.id !== id))
                }
              />
            ))}
          </ToastContainer>
          {children}
        </Container>
      </main>

      <Footer />
    </div>
  );
};