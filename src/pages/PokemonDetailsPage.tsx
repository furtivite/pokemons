import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Alert, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { BackButton } from '@components/BackButton';
import { PokemonHeader } from '@components/PokemonHeader';
import { PokemonStats } from '@components/PokemonStats';
import { PokemonAbilities } from '@components/PokemonAbilities';
import { useAppDispatch, useAppSelector } from '../store';
import { MAX_COMPARE, selectSelectedPokemons, toggleSelected } from '@features/compare/compareSlice';

export const PokemonDetailsPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { data: pokemon, error, isLoading } = useGetPokemonByNameQuery(name || '');

    const dispatch = useAppDispatch();
    const selected = useAppSelector(selectSelectedPokemons);
    const isInCompare = name ? selected.includes(name) : false;

    if (isLoading) return <LoadingSpinner className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger">Error loading Pokémon details.</Alert>;
    if (!pokemon) return <Alert variant="warning">Pokémon not found.</Alert>;

    return (
        <Container className="py-4">
            <div className="d-flex mb-4 align-items-center">
                <BackButton />
                <ButtonGroup className="ms-3">
                    <ToggleButton
                        id="compare-toggle"
                        type="checkbox"
                        variant={isInCompare ? 'success' : 'outline-primary'}
                        checked={isInCompare}
                        value={name!}
                        disabled={!isInCompare && selected.length >= MAX_COMPARE}
                        onChange={() => name && dispatch(toggleSelected(name))}
                    />
                </ButtonGroup>
            </div>
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
