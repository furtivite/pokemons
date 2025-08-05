import React from 'react';
import { Card, Badge, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import { useAppDispatch, useAppSelector } from '../store';
import {
    selectSelectedPokemons,
    toggleSelected,
    MAX_COMPARE,
} from '@features/compare/compareSlice';
import { LoadingSpinner } from './LoadingSpinner';
import { AbilityBadge } from './AbilityBadge';

interface PokemonCardProps {
    name: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name }) => {
    const dispatch = useAppDispatch();
    const selected = useAppSelector(selectSelectedPokemons);
    const isInCompare = selected.includes(name);

    const { data: pokemon, isLoading, error } = useGetPokemonByNameQuery(name);
    const navigate = useNavigate();

    if (isLoading) return <LoadingSpinner className="d-block mx-auto my-4" />;
    if (error || !pokemon)
    return <Alert variant="danger">Error loading {name}</Alert>;

    return (
        <Card
            as="article"
            role="group"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    navigate(`/pokemon/${name}`);
                }
                if (e.key === ' ' || e.key === 'Spacebar') {
                    dispatch(toggleSelected(name));
                    e.preventDefault();
                }
            }}
            className="mb-4 h-100"
        >
            <Card.Img
                variant="top"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="p-3"
                loading="lazy"
            />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title
                        as="h2"
                        id={`card-title-${name}`}
                        className="h5 text-capitalize mb-0"
                    >
                        <Link to={`/pokemon/${name}`}>{name}</Link>
                    </Card.Title>
                    <Form.Check
                        type="checkbox"
                        checked={isInCompare}
                        disabled={!isInCompare && selected.length >= MAX_COMPARE}
                        onChange={() => dispatch(toggleSelected(name))}
                        aria-label={
                            isInCompare
                            ? `Remove ${name} from comparison`
                            : `Add ${name} to comparison`
                        }
                    />
                </div>
                <div className="mb-2">
                    {pokemon.types.map((t) => (
                        <Badge
                            bg="primary"
                            key={t.slot}
                            className="me-1 text-capitalize"
                        >
                            {t.type.name}
                        </Badge>
                    ))}
                </div>
                <div className="mt-auto">
                    {pokemon.abilities.map((ab) => (
                        <AbilityBadge key={ab.ability.name} name={ab.ability.name} />
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};
