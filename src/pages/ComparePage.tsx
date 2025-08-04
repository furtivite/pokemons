import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { selectSelectedPokemons } from '@features/compare/compareSlice';
import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useAppSelector } from '../store';

export const ComparePage: React.FC = () => {
    const selected = useAppSelector(selectSelectedPokemons);
    const queries = selected.map(name => useGetPokemonByNameQuery(name));

    if (selected.length === 0) {
        return (
            <Container className="py-4">
                <Alert variant="info">No Pokémon selected for comparison.</Alert>
            </Container>
        );
    }

    if (queries.some(q => q.isLoading)) return <LoadingSpinner className="d-block mx-auto mt-5" />;
    if (queries.some(q => q.error)) return <Alert variant="danger">Error loading comparison data.</Alert>;

    return (
        <Container className="py-4">
            {/* Здесь позже рендерить бок-о-бок карточки */}
        </Container>
    );
};

