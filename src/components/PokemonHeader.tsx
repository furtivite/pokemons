import React from 'react';
import { Col, Badge } from 'react-bootstrap';

interface PokemonHeaderProps {
    name: string;
    spriteUrl: string;
    types: { slot: number; type: { name: string } }[];
}

export const PokemonHeader: React.FC<PokemonHeaderProps> = ({ name, spriteUrl, types }) => (
    <Col xs={12} md={4} className="text-center mb-4">
        <img src={spriteUrl} alt={name} className="img-fluid" />
        <h1 className="text-capitalize mt-3 h2">{name}</h1>
        <div>
            {types.map((t) => (
                <Badge bg="primary" key={t.slot} className="me-1 text-capitalize">
                    {t.type.name}
                </Badge>
            ))}
        </div>
    </Col>
);
