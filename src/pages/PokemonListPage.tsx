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
                    <ListGroup.Item key={pkm.name}>{pkm.name}</ListGroup.Item>
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
