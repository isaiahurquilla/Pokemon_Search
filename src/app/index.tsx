import PokemonView from "@/components/PokemonView";
import { usePokemonController } from "@/controllers/usePokemonController";


export default function HomeScreen() {
  const { 
    pokemonName, 
    setPokemonName, 
    pokemon, 
    loading, 
    error, 
    favorites,
    isFavorite,
    toggleFavorite,
    loadFavorite,
    search,} =
    usePokemonController();

  return (
    <PokemonView
      pokemonName={pokemonName}
      onChangePokemonName={setPokemonName}
      onSearch={search}
      loading={loading}
      error={error}
      pokemon={pokemon}
      favorites={favorites}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      onLoadFavorite={loadFavorite}
    />
  );
}