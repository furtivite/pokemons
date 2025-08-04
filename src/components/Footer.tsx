import React from "react";
import { Container } from "react-bootstrap";

export const Footer: React.FC = () => (
    <footer className="bg-light text-center text-secondary py-3 mt-auto">
        <Container>
            <p className="mb-0">
                ©&nbsp;{new Date().getFullYear()} by&nbsp;
                <a href="https://github.com/furtivite" target="_blank" rel="noopener noreferrer">
                FRTVT
                </a>
            </p>
            <p>
                <small>All trademarks belong to their respective owners. Educational project only.</small>
            </p>
        </Container>
    </footer>
)