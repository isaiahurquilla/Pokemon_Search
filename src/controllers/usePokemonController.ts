import { useEffect, useMemo, useState } from "react";
import { loadFavorites, saveFavorites } from "@/services/favoritesStorage";
import type { Pokemon } from "@/models/Pokemon";
import { fetchPokemonByName } from "@/services/pokemonApi";

export function usePokemonController() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
    (async () => {
      const stored = await loadFavorites();
      setFavorites(stored);
    })();
  }, []);

  // save favorites whenever favorites change
  useEffect(() => {
    saveFavorites(favorites).catch(() => {});
  }, [favorites]);

    const isFavorite = useMemo(() => {
        if (!pokemon) return false;
        return favorites.includes(pokemon.name.toLowerCase());
    }, [pokemon, favorites]);

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
            setPokemonName(result.name);
        } catch (err: any) {
            setError(err?.message ?? "An error occurred while fetching the Pokemon data");
        } finally {
            setLoading(false);
        }
    }

    function toggleFavorite() {
    if (!pokemon) return;

    const name = pokemon.name.toLowerCase();

    setFavorites((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      }
      return [...prev, name].sort();
    });
  }
  async function loadFavorite(name: string) {
    setPokemonName(name);
    setLoading(true);
    setError("");
    setPokemon(null);
    try {
      const result = await fetchPokemonByName(name);
      setPokemon(result);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }


    return {
        pokemonName,
        pokemon,
        loading,
        error,
        favorites,
        isFavorite,
        setPokemonName,
        search,
        toggleFavorite,
        loadFavorite
    };
}