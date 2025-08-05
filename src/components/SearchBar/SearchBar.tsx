import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => <Form.Control type="text" placeholder="Search Pokémon" value={value} onChange={(e) => onChange(e.target.value)} />;
