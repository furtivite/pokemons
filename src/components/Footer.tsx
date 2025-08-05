import { ThemeContext } from "@theme/ThemeContext";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";

export const Footer: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const bgClass = theme === "light" ? "bg-light" : "bg-dark";
    const textClass = theme === "light" ? "text-secondary" : "text-light";
    const linkClass = theme === "light" ? "" : "text-decoration-none text-light"
    const date = new Date().getFullYear()

    return (
        <footer className={`${bgClass} text-center ${textClass} py-3 mt-auto`}>
            <Container fluid="sm">
                <p className="mb-0">
                    ©&nbsp;{date} by&nbsp;
                    <a
                        href="https://github.com/furtivite"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                    >
                        FRTVT
                    </a>
                </p>
                <p>
                    <small>
                        All trademarks belong to their respective owners. Educational project only.
                    </small>
                </p>
            </Container>
        </footer>
    );
}