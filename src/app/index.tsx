import PokemonView from "@/components/PokemonView";
import { usePokemonController } from "@/controllers/usePokemonController";


export default function HomeScreen() {
  const { pokemonName, setPokemonName, pokemon, loading, error, search } =
    usePokemonController();

  return (
    <PokemonView
      pokemonName={pokemonName}
      onChangePokemonName={setPokemonName}
      onSearch={search}
      loading={loading}
      error={error}
      pokemon={pokemon}
    />
  );
}