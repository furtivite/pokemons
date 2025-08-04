import React, { useState } from "react";
import {
    Spinner,
    Alert,
    ListGroup,
    Row,
    Col,
} from "react-bootstrap";
import { useGetPokemonListQuery } from "@api/pokemonApi";
import { SearchBar } from "@components/SearchBar";
import { PageSizeSelector } from "@components/PageSizeSelector";
import { PaginationControl } from "@components/PaginationControl";
import { Link } from "react-router-dom";

export const PokemonListPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const offset = (currentPage - 1) * pageSize;
    const { data, error, isLoading } = useGetPokemonListQuery({
        limit: pageSize,
        offset,
    });

    const filtered = data?.results.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const totalPages = Math.ceil((data?.count || 0) / pageSize);

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    if (error) {
        return <Alert variant="danger">Error loading Pokémon list.</Alert>;
    }

    return (
        <>
            <Row className="gx-3 mb-3 align-items-center">
                <Col>
                    <SearchBar
                        value={search}
                        onChange={val => {
                            setSearch(val);
                            setCurrentPage(1);
                        }}
                    />
                </Col>
                <Col xs="auto">
                    <PageSizeSelector
                        value={pageSize}
                        onChange={size => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                </Col>
            </Row>

            <ListGroup className="mb-3">
                {filtered.map((pkm) => (
                    <ListGroup.Item
                        key={pkm.name}
                        action
                        as={Link}
                        to={`/pokemon/${pkm.name}`}
                    >
                        {pkm.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <PaginationControl
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
};
