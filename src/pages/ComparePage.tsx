import React from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { selectSelectedPokemons, clearSelected } from '@features/compare/compareSlice';
import { useAppSelector, useAppDispatch } from '../store';

export const ComparePage: React.FC = () => {
  const selected = useAppSelector(selectSelectedPokemons);
  const dispatch = useAppDispatch();

  if (selected.length === 0) {
    return (
      <Container className="py-4">
        <Alert variant="info">No Pokémon selected for comparison.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Comparison ({selected.length})</h3>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => dispatch(clearSelected())}
        >
          Clear All
        </Button>
      </div>
      <Row>
        {selected.map((name) => (
          <Col key={name} xs={12} md={Math.floor(12 / selected.length)}>
            <>{name}</>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
