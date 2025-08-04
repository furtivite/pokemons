import React from 'react';
import { AbilityBadge } from '@components/AbilityBadge';

interface Ability {
    ability: { name: string };
}

interface PokemonAbilitiesProps {
    abilities: Ability[];
}

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({ abilities }) => (
    <>
        <h2 className="mt-4 h4">Abilities</h2>
        <div>
            {abilities.map((ab) => (
                <AbilityBadge key={ab.ability.name} name={ab.ability.name} />
            ))}
        </div>
    </>
);
