import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Alert } from 'react-bootstrap';
import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { BackButton } from '@components/BackButton';
import { PokemonHeader } from '@components/PokemonHeader';
import { PokemonStats } from '@components/PokemonStats';
import { PokemonAbilities } from '@components/PokemonAbilities';

export const PokemonDetailsPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { data: pokemon, error, isLoading } = useGetPokemonByNameQuery(name || '');

    if (isLoading) return <LoadingSpinner className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger">Error loading Pokémon details.</Alert>;
    if (!pokemon) return <Alert variant="warning">Pokémon not found.</Alert>;

    return (
        <Container className="py-4">
            <BackButton />
            <Row>
                <PokemonHeader
                    name={pokemon.name}
                    spriteUrl={pokemon.sprites.front_default}
                    types={pokemon.types}
                />
                <PokemonStats stats={pokemon.stats} />
                <PokemonAbilities abilities={pokemon.abilities} />
            </Row>
        </Container>
    );
};
