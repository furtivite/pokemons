import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const PokemonDetailsSkeleton: React.FC = () => (
  <Container fluid="sm" className="py-4">
    <Row>
      <Col xs={12} md={4} className="text-center mb-4">
        <Skeleton circle height={150} width={150} className="mx-auto mb-3" />
        <Skeleton width="50%" height={32} className="mx-auto mb-2" />
        <Row className="justify-content-center">
          {Array.from({ length: 2 }).map((_, i) => (
            <Col key={i} xs="auto">
              <Skeleton width={60} height={24} className="me-1" />
            </Col>
          ))}
        </Row>
      </Col>
      <Col xs={12} md={8}>
        <Skeleton width="30%" height={24} className="mb-3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width="100%" height={20} className="mb-3" />
        ))}
        <Skeleton width="30%" height={24} className="mt-4 mb-2" />
        <Row>
          {Array.from({ length: 3 }).map((_, i) => (
            <Col key={i} xs="auto">
              <Skeleton width={80} height={24} className="me-1" />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  </Container>
);