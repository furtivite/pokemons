import React from 'react';
import { Form } from 'react-bootstrap';

interface PageSizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
}

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ value, onChange }) => (
  <Form.Select value={value} onChange={(e) => onChange(+e.target.value)}>
    {[10, 20, 50, 100].map((n) => (
      <option key={n} value={n}>
        {n} per page
      </option>
    ))}
  </Form.Select>
);
