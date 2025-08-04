import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
            &larr; Back
        </Button>
    );
};
