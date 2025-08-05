import React from 'react';
import { Card, Badge, ProgressBar, Alert, Button } from 'react-bootstrap';
import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { AbilityBadge } from '@components/AbilityBadge';
import { toggleSelected } from '@features/compare/compareSlice';
import { useAppDispatch } from '@store';
import { Pokemon } from '@api/pokemonApi';

interface CompareCardProps {
    name: string;
}

export const CompareCard: React.FC<CompareCardProps> = ({ name }) => {
    const { data: pokemon, isLoading, error } = useGetPokemonByNameQuery(name);
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <LoadingSpinner className="d-block mx-auto my-3" />;
    }
    if (error || !pokemon) {
        return <Alert variant="danger">Error loading {name}</Alert>;
    }

    return (
        <Card className="mb-3 mw-lg-50">
            <Card.Header className="d-flex justify-content-end p-2" role="group" aria-label={`Comparison controls for ${name}`}>
                <Button
                    variant="outline-danger"
                    size="sm"
                    tabIndex={0}
                    onClick={() => dispatch(toggleSelected(name))}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dispatch(toggleSelected(name));
                    }
                    }}
                    aria-label={`Remove ${name} from comparison`}
                >
                    Remove
                </Button>
            </Card.Header>
            <Card.Img
                variant="top"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                loading="lazy"
            />
            <Card.Body>
                <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>

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

                {pokemon.stats.map((s) => (
                    <div key={s.stat.name} className="mb-2">
                        <small className="text-capitalize">{s.stat.name}:</small>
                        <ProgressBar
                            now={s.base_stat}
                            max={255}
                            label={`${s.base_stat}`}
                        />
                    </div>
                ))}

                <div>
                    {pokemon.abilities.map((ab) => (
                        <AbilityBadge key={ab.ability.name} name={ab.ability.name} />
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};
