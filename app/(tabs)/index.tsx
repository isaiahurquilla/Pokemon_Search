import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");

function handleSearch() {
  const q = pokemonName.trim().toLowerCase();
  console.log("Search pressed:", q);

  if (!q) { // If the input is empty, log a message and return early
    console.log("Input a name");
    return;
  }

  console.log("Searching for:", q); // Log the search term before making the API call

  fetch('https://pokeapi.co/api/v2/pokemon/' + q) // Makes a GET request to the PokeAPI with the specified Pokemon name
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      return response.json(); //Parses the JSON response into a JavaScript object
    })
    .then(data => {
      console.log("Pokemon data:\n", JSON.stringify(data, null, 2));  // Logs the retrieved Pokemon data to the console in a formatted manner for better readability
    })
    .catch(error => {
      console.error("Error fetching Pokemon data:", error.message); // Logs any errors that occur during the fetch operation to the console
    });
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