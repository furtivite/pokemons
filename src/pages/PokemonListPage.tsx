import React, { useState } from "react";
import { Spinner, Alert, ListGroup, Form, Pagination } from 'react-bootstrap';
import { useGetPokemonListQuery } from '@api/pokemonApi';

export const PokemonListPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [pageSize, setPageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * pageSize;
    const { data, error, isLoading } = useGetPokemonListQuery({
        limit: pageSize,
        offset,
    });

    const filtered = data?.results.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    if (isLoading) {
        return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    }
    if (error) {
        return <Alert variant="danger">Error loading Pokémon list.</Alert>;
    }

    return (
        <>
            <Form.Control
                type="text"
                placeholder="Search Pokémon"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Form.Select
                value={pageSize}
                onChange={e => {
                    setPageSize(+e.target.value);
                    setCurrentPage(1);
                }}
                >
                {[10,20,50,100].map(n => (
                    <option key={n} value={n}>{n} per page</option>
                ))}
            </Form.Select>
            <ListGroup>
                {filtered.map(pkm => (
                    <ListGroup.Item key={pkm.name}>{pkm.name}</ListGroup.Item>
                ))}
            </ListGroup>
            <Pagination>
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next
                    disabled={!data || offset + pageSize >= (data.count)}
                    onClick={() => setCurrentPage(p => p + 1)}
                />
            </Pagination>
        </>
    );
}