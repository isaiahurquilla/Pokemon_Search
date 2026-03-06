import { useState } from "react";
import type { Pokemon } from "@/models/Pokemon";
import { fetchPokemonByName } from "@/services/pokemonApi";

export function usePokemonController() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function validateInput(raw: string) {
        const q = raw.trim().toLowerCase();
        if (!q)throw new Error("Please enter a Pokemon name");
        return q;
    }

    async function search() {
        setLoading(true);
        setError("");
        setPokemon(null);

        try {
            const q = validateInput(pokemonName);
            const result = await fetchPokemonByName(q);
            setPokemon(result);
        } catch (err: any) {
            setError(err?.message ?? "An error occurred while fetching the Pokemon data");
        } finally {
            setLoading(false);
        }
    }

    return {
        pokemonName,
        pokemon,
        loading,
        error,
        setPokemonName,
        search,
    };
}