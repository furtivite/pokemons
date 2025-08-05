import React, { useState } from "react";
import {
    Alert,
    Row,
    Col,
} from "react-bootstrap";
import { useGetPokemonListQuery } from "@api/pokemonApi";
import { SearchBar } from "@components/SearchBar";
import { PageSizeSelector } from "@components/PageSizeSelector";
import { PaginationControl } from "@components/PaginationControl";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { PokemonCard } from "@components/PokemonCard";

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
            <LoadingSpinner />
        );
    }
    if (error) {
        return <Alert variant="danger">Error loading Pokémon list.</Alert>;
    }

    return (
        <>
            <Row className="gx-3 mb-3 align-items-center">
                <Col xs={12} sm={8}>
                    <SearchBar
                        value={search}
                        onChange={val => {
                            setSearch(val);
                            setCurrentPage(1);
                        }}
                    />
                </Col>
                <Col xs={12} sm={4} className="mt-2 mt-sm-0">
                    <PageSizeSelector
                        value={pageSize}
                        onChange={size => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                </Col>
            </Row>

            <Row className="gx-3 gy-4 mb-4">
                {filtered.map((pkm) => (
                    <Col
                        key={pkm.name}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <PokemonCard name={pkm.name} />
                    </Col>
                ))}
            </Row>

            <PaginationControl
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
};
