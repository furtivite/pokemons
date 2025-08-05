import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Alert, ButtonGroup, ToggleButton, Col } from 'react-bootstrap';
import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import { BackButton } from '@components/BackButton';
import { PokemonHeader } from '@components/PokemonHeader';
import { PokemonStats } from '@components/PokemonStats';
import { PokemonAbilities } from '@components/PokemonAbilities';
import { useAppDispatch, useAppSelector } from '../store';
import { MAX_COMPARE, selectSelectedPokemons, toggleSelected } from '@features/compare/compareSlice';
import { PokemonDetailsSkeleton } from '@components/PokemonDetailsSkeleton';

export const PokemonDetailsPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { data: pokemon, error, isLoading } = useGetPokemonByNameQuery(name || '');

    const dispatch = useAppDispatch();
    const selected = useAppSelector(selectSelectedPokemons);
    const isInCompare = name ? selected.includes(name) : false;

    if (isLoading) return <PokemonDetailsSkeleton />;
    if (error) return <Alert variant="danger">Error loading Pokémon details.</Alert>;
    if (!pokemon) return <Alert variant="warning">Pokémon not found.</Alert>;

    return (
        <Container fluid="sm" className="py-4">
            <div className="d-flex mb-4 align-items-center">
                <BackButton />
                <ButtonGroup className="ms-3" aria-label="Compare toggle group">
                    <ToggleButton
                        id="compare-toggle"
                        type="checkbox"
                        role="switch"
                        aria-checked={isInCompare}
                        aria-label={
                            isInCompare
                            ? `Remove ${name} from comparison`
                            : `Add ${name} to comparison`
                        }
                        variant={isInCompare ? 'success' : 'outline-primary'}
                        checked={isInCompare}
                        value={name ?? ''}
                        disabled={!isInCompare && selected.length >= MAX_COMPARE}
                        tabIndex={0}
                        onChange={() => name && dispatch(toggleSelected(name))}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault();
                                name && dispatch(toggleSelected(name));
                            }
                        }}
                    >
                        {isInCompare ? 'Added to Compare' : 'Add to Compare'}
                    </ToggleButton>
                </ButtonGroup>
            </div>
            <Row>
                <PokemonHeader
                    name={pokemon.name}
                    spriteUrl={pokemon.sprites.front_default}
                    types={pokemon.types}
                />
                <Col xs={12} md={4}>
                    <PokemonStats stats={pokemon.stats} />
                </Col>
                <Col xs={12} md={4}>
                    <PokemonAbilities abilities={pokemon.abilities} />
                </Col>
            </Row>
        </Container>
    );
};
