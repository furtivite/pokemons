import React from 'react';
import { ProgressBar } from 'react-bootstrap';

interface Stat {
  stat: { name: string };
  base_stat: number;
}

interface PokemonStatsProps {
  stats: Stat[];
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => (
  <>
    <h2 className="h4">Stats</h2>
    {stats.map((s) => (
      <div key={s.stat.name} className="mb-3">
        <p className="mb-0">
          <strong className="text-capitalize">{s.stat.name}:</strong>
        </p>
        <ProgressBar now={s.base_stat} max={255} label={`${s.base_stat}`} />
      </div>
    ))}
  </>
);
