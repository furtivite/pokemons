import React from "react";
import { Spinner, Alert, ListGroup } from 'react-bootstrap';
import { useGetPokemonListQuery } from '@api/pokemonApi';

export const PokemonListPage: React.FC = () => {
    const { data, error, isLoading } = useGetPokemonListQuery({ limit: 20, offset: 0 });

    if (isLoading) {
        return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    }
    if (error) {
        return <Alert variant="danger">Error loading Pokémon list.</Alert>;
    }

    return (
        <ListGroup>
            {data?.results.map(pkm => (
                <ListGroup.Item key={pkm.name}>{pkm.name}</ListGroup.Item>
            ))}
        </ListGroup>
    );
}