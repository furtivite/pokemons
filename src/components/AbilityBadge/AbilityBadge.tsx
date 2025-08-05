import React from "react";
import {
    useGetAbilityByNameQuery,
} from '@api/pokemonApi';
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

export const AbilityBadge: React.FC<{ name: string }> = ({ name }) => {
    const { data: ability } = useGetAbilityByNameQuery(name);
    const effect = ability?.effect_entries.find((e) => e.language.name === 'en')?.short_effect || 'Loading...';

    return (
        <OverlayTrigger
            placement="top"
            trigger={['hover', 'focus']}
            overlay={<Tooltip id={`tooltip-${name}`}>{effect}</Tooltip>}
        >
            <Badge
                bg="info"
                tabIndex={0}
                className="me-2 text-capitalize"
                style={{ cursor: 'pointer' }}
                aria-describedby={`tooltip-${name}`}
            >
                {name}
            </Badge>
        </OverlayTrigger>
    );
};
