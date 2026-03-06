import { fetchPokemonByName, type PokemonResult } from "../services/pokemonApi";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image, ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<PokemonResult | null>(null);

  async function handleSearch() {
  setLoading(true);
  setPokemon(null);

  try {
    const result = await fetchPokemonByName(pokemonName);
    setPokemon(result);
    setError("");
    console.log("Pokemon result:\n", JSON.stringify(result, null, 2));
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} />
      {
        loading && ( // If the loading state is true, display a loading indicator and message to inform the user that the search is in progress
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <ActivityIndicator />
            <Text> Loading...</Text>
          </View>
        )
      }
      {error ? ( // If there is an error message, display it to the user in red text
        <Text style={{ color: "red", marginTop: 12 }}>{error}</Text>
      ) : null}
      {pokemon && (
  <View style={{ marginTop: 16, alignItems: "center" }}>
    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
      {pokemon.name.toUpperCase()}
    </Text>

    {pokemon.sprite ? (
      <Image
        source={{ uri: pokemon.sprite }}
        style={{ width: 140, height: 140, marginVertical: 10 }}
        resizeMode="contain"
      />
    ) : (
      <Text style={{ marginTop: 8 }}>No sprite available</Text>
    )}

    <Text style={{ marginTop: 6 }}>
      Types: {pokemon.types.join(", ")}
    </Text>

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