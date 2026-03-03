import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image, ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

function handleSearch() {
  const q = pokemonName.trim().toLowerCase();
  console.log("Search pressed:", q);

  setError(""); // Clear any previous error messages

  if (!q) { // If the input is empty, log a message and return early
    console.log("Input a name");
    return;
  }
  setLoading(true); // Set loading state to true to indicate that a search is in progress

  fetch('https://pokeapi.co/api/v2/pokemon/' + q) // Makes a GET request to the PokeAPI with the specified Pokemon name
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      return response.json(); //Parses the JSON response into a JavaScript object
    })
    .then(data => {
      setError(""); // Clear any previous error messages if the fetch is successful
      console.log("Pokemon data:\n", JSON.stringify(data, null, 2));  // Logs the retrieved Pokemon data to the console in a formatted manner for better readability
    })
    .catch(error => {
      console.error("Error fetching Pokemon data:", error.message); // Logs any errors that occur during the fetch operation to the console
      setError(error.message); // Set the error state to display the error message to the user
    })
    .finally(() => {
      setLoading(false); // Set loading state back to false after the fetch operation is complete, regardless of success or failure
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