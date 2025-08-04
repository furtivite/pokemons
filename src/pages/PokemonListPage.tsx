import React, { useState } from "react";
import {
    Alert,
    ListGroup,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetPokemonListQuery } from "@api/pokemonApi";
import { SearchBar } from "@components/SearchBar";
import { PageSizeSelector } from "@components/PageSizeSelector";
import { PaginationControl } from "@components/PaginationControl";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { MAX_COMPARE, selectSelectedPokemons, toggleSelected } from "@features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "../store";

export const PokemonListPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useAppDispatch();
    const selected = useAppSelector(selectSelectedPokemons);

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
                    <ListGroup.Item key={pkm.name} className="d-flex align-items-center">
                        <Form.Check
                            type="checkbox"
                            className="me-3"
                            checked={selected.includes(pkm.name)}
                            disabled={!selected.includes(pkm.name) && selected.length >= MAX_COMPARE}
                            onChange={() => dispatch(toggleSelected(pkm.name))}
                        />
                        <Link to={`/pokemon/${pkm.name}`}>{pkm.name}</Link>
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
