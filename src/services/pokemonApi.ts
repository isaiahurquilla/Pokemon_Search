// src/services/pokemonApi.ts

export type PokemonResult = {
  name: string;
  sprite: string | null;
  types: string[];
  abilities: string[];
  moves: string[]; // first 5
};

export async function fetchPokemonByName(name: string): Promise<PokemonResult> {
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

  // Transform raw API JSON into a Pokemon-shaped object your UI expects
  const result: PokemonResult = {
    name: data?.name ?? q,
    sprite: data?.sprites?.front_default ?? null,
    types: Array.isArray(data?.types)
      ? data.types.map((t: any) => t?.type?.name).filter(Boolean)
      : [],
    abilities: Array.isArray(data?.abilities)
      ? data.abilities.map((a: any) => a?.ability?.name).filter(Boolean)
      : [],
    moves: Array.isArray(data?.moves)
      ? data.moves
          .slice(0, 5)
          .map((m: any) => m?.move?.name)
          .filter(Boolean)
      : [],
  };

  return result;
}