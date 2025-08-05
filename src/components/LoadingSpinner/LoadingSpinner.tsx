import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => (
  <Spinner animation="border" role="status" className={className}>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);
