import React from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { selectSelectedPokemons } from '@features/compare/compareSlice';
import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useAppSelector } from '../store';

export const ComparePage: React.FC = () => {
    const selected = useAppSelector(selectSelectedPokemons);

    if (selected.length === 0) {
        return (
            <Container className="py-4">
                <Alert variant="info">No Pokémon selected for comparison.</Alert>
            </Container>
        );
    }

    const queries = selected.map((name) => {
        const result = useGetPokemonByNameQuery(name);
        const { data: pk, ...rest } = result;
        return { name, pk, ...rest };
    });

    if (queries.some((q) => q.isLoading)) {
        return <LoadingSpinner className="d-block mx-auto mt-5" />;
    }

    if (queries.some((q) => q.error)) {
        return (
            <Container className="py-4">
                <Alert variant="danger">Error loading comparison data.</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row>
                {queries.map(({ name, pk }, idx) => (
                    <Col key={name} xs={12} md={Math.floor(12 / selected.length)}>
                    {pk && <>{pk.name} {idx}</>}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

