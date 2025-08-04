import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useAppSelector } from '../store';
import { selectSelectedPokemons } from '../features/compare/compareSlice';

export const ComparePage: React.FC = () => {
    const selected = useAppSelector(selectSelectedPokemons);

    if (selected.length === 0) {
        return (
            <Container className="py-4">
                <Alert variant="info">No Pokémon selected for comparison.</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            {/* Здесь позже рендерить бок-о-бок карточки */}
        </Container>
    );
};

