// src/components/PokemonView.tsx
import type { Pokemon } from "@/models/Pokemon";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

type Props = {
  pokemonName: string;
  onChangePokemonName: (text: string) => void;
  onSearch: () => void;

  loading: boolean;
  error: string;
  pokemon: Pokemon | null;
};

export default function PokemonView({
  pokemonName,
  onChangePokemonName,
  onSearch,
  loading,
  error,
  pokemon,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={onChangePokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={onSearch} />

      {loading && (
        <View style={{ marginTop: 12, alignItems: "center" }}>
          <ActivityIndicator />
          <Text> Loading...</Text>
        </View>
      )}

      {error ? <Text style={{ color: "red", marginTop: 12 }}>{error}</Text> : null}

      {pokemon && (
        <View style={{ marginTop: 16, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {pokemon.name.toUpperCase()}
          </Text>

          {pokemon.image ? (
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 140, height: 140, marginVertical: 10 }}
              resizeMode="contain"
            />
          ) : (
            <Text style={{ marginTop: 8 }}>No sprite available</Text>
          )}

          <Text style={{ marginTop: 6 }}>Types: {pokemon.types.join(", ")}</Text>

          <Text style={{ marginTop: 6 }}>
            Abilities: {pokemon.abilities.join(", ")}
          </Text>

          <Text style={{ marginTop: 6, textAlign: "center" }}>
            First 5 moves: {pokemon.moves.join(", ")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});