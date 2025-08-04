import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Spinner,
    Alert,
    Badge,
    ProgressBar,
    Button,
} from 'react-bootstrap';
import {
    useGetPokemonByNameQuery,
} from '@api/pokemonApi';
import { AbilityBadge } from '@components/AbilityBadge';
import { LoadingSpinner } from '@components/LoadingSpinner';

export const PokemonDetailsPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const {
        data: pokemon,
        error,
        isLoading,
    } = useGetPokemonByNameQuery(name || '');

    if (isLoading) {
        return (
            <LoadingSpinner className='d-block mx-auto mt-5' />
        );
    }

    if (error) {
        return <Alert variant="danger">Error loading Pokémon details.</Alert>;
    }

    if (!pokemon) {
        return <Alert variant="warning">Pokémon not found.</Alert>;
    }

    return (
    <Container className="py-4">
        <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
            &larr; Back
        </Button>

        <Row>
            <Col xs={12} md={4} className="text-center mb-4">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="img-fluid"
                />
                <h1 className="text-capitalize mt-3 h2">{pokemon.name}</h1>
                <div>
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
            </Col>

            <Col xs={12} md={8}>
                <h2 className='h4'>Stats</h2>
                {pokemon.stats.map((s) => (
                    <div key={s.stat.name} className="mb-3">
                        <p className='mb-0'>
                            <strong className="text-capitalize">{s.stat.name}:</strong>
                        </p>
                        <ProgressBar
                            now={s.base_stat}
                            max={255}
                            label={`${s.base_stat}`}
                        />
                    </div>
                ))}

                <h2 className="mt-4 h4">Abilities</h2>
                <div>
                    {pokemon.abilities.map((ab) => (
                        <AbilityBadge key={ab.ability.name} name={ab.ability.name} />
                    ))}
                </div>
            </Col>
        </Row>
    </Container>
    );
};

