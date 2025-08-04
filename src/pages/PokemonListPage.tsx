import React, { useState } from "react";
import {
    Spinner,
    Alert,
    ListGroup,
    Form,
    Pagination,
    Row,
    Col,
} from "react-bootstrap";
import { useGetPokemonListQuery } from "@api/pokemonApi";

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

    const getPageItems = (): (number | "ellipsis")[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | "ellipsis")[] = [];

        pages.push(1);
        pages.push(2);

        const start = Math.max(3, currentPage - 1);
        const end = Math.min(totalPages - 2, currentPage + 1);

        if (start > 3) {
            pages.push("ellipsis");
        }

        for (let p = start; p <= end; p++) {
            pages.push(p);
        }

        if (end < totalPages - 2) {
            pages.push("ellipsis");
        }

        pages.push(totalPages - 1);
        pages.push(totalPages);

        return pages;
    };

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
                    <Form.Control
                        type="text"
                        placeholder="Search Pokémon"
                        value={search}
                        onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                        }}
                    />
                </Col>
                <Col xs="auto">
                    <Form.Select
                        value={pageSize}
                        onChange={(e) => {
                        setPageSize(+e.target.value);
                        setCurrentPage(1);
                        }}
                    >
                        {[10, 20, 50, 100].map((n) => (
                            <option key={n} value={n}>
                            {n} per page
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <ListGroup className="mb-3">
                {filtered.map((pkm) => (
                    <ListGroup.Item key={pkm.name}>{pkm.name}</ListGroup.Item>
                ))}
            </ListGroup>

            <Pagination>
                {getPageItems().map((item, idx) =>
                    item === "ellipsis" ? (
                        <Pagination.Ellipsis key={`e-${idx}`} disabled />
                    ) : (
                        <Pagination.Item
                            key={item}
                            active={item === currentPage}
                            onClick={() => setCurrentPage(item)}
                        >
                            {item}
                        </Pagination.Item>
                    )
                )}
            </Pagination>
        </>
    );
};
