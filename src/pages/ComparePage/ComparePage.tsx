import React from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { selectSelectedPokemons } from '@features/compare/compareSlice';
import { useAppSelector } from '@store';
import { CompareCard } from '@components/CompareCard';

export const ComparePage: React.FC = () => {
  const selected = useAppSelector(selectSelectedPokemons);

  if (selected.length === 0) {
    return (
      <Container fluid="sm" className="py-4">
        <Alert variant="info">No Pokémon selected for comparison.</Alert>
      </Container>
    );
  }

  return (
    <Container fluid="sm" className="py-4">
        <h1 className='mb-4 h3'>Comparison ({selected.length})</h1>
        <Row>
            {selected.map((name) => (
                <Col 
                  key={name} 
                  xs={12}
                  sm={selected.length > 1 ? 6 : 12}
                  md={Math.floor(12 / selected.length)}
                  className="mb-4"
                >
                    <CompareCard name={name} />
                </Col>
            ))}
        </Row>
    </Container>
  );
};
