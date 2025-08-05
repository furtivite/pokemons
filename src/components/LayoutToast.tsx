import React from "react";
import { Toast, ToastContainer, ToastProps } from "react-bootstrap";

interface LayoutToastProps extends ToastProps {
    title: string,
    text: string,  
}

export const LayoutToast: React.FC<LayoutToastProps> = ({bg, title, text, show, onClose}) => (
    <ToastContainer position="top-end" className="p-3">
        <Toast
            bg={bg}
            onClose={onClose}
            show={show}
            delay={3000}
            autohide
            tabIndex={0}
        >
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body className="text-dark">
                {text}
            </Toast.Body>
        </Toast>
    </ToastContainer>
)