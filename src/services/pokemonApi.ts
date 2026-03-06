// src/services/pokemonApi.ts

import { PokemonBuilder} from "@/models/PokemonBuilder";
import type { Pokemon } from "@/models/Pokemon";

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const q = name.trim().toLowerCase();

  if (!q) {
    throw new Error("Please enter a Pokemon name");
  }

  const url = "https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(q);

  const response = await fetch(url);

  if (!response.ok) {
    // You can customize messaging by status if you want:
    if (response.status === 404) throw new Error("Pokemon not found");
    throw new Error(`Request failed (${response.status})`);
  }

  const data = await response.json();

  const types = Array.isArray(data?.types)
    ? data.types.map((t: any) => t?.type?.name).filter(Boolean)
    : [];
  
  const abilities = Array.isArray(data?.abilities)
    ? data.abilities.map((a: any) => a?.ability?.name).filter(Boolean)
    : [];

  const moves = Array.isArray(data?.moves)
    ? data.moves
        .slice(0, 5) // Limit to first 5 moves for simplicity
        .map((m: any) => m?.move?.name)
        .filter(Boolean)
    : [];

  const image = data?.sprites?.front_default ?? null;

  return new PokemonBuilder()
    .setName(data?.name ?? q) // Fallback to query if name is missing
    .setImage(image)
    .setTypes(types)
    .setAbilities(abilities)
    .setMoves(moves)
    .build();
}