import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const PokemonCardSkeleton: React.FC = () => (
  <Card className="mb-4 h-100">
    <Skeleton height={150} />
    <Card.Body className="d-flex flex-column">
      <Skeleton width="60%" height={24} className="mb-2" />
      <Skeleton width="40%" height={20} className="mb-2" />
      <div className="mt-auto">
        <Row className="gx-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Col key={i}>
              <Skeleton width="100%" height={20} className="mb-1" />
            </Col>
          ))}
        </Row>
      </div>
    </Card.Body>
  </Card>
);