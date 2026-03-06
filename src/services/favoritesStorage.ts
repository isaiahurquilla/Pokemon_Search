import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "favorites:v1";
export async function loadFavorites(): Promise<string[]> {
    try{
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        return parsed
        .filter((x) => typeof x === "string")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    }
    catch{
        return [];
    }
}

export async function saveFavorites(favorites: string[]): Promise<void> {
    const cleaned = favorites
    .filter((x) => typeof x === "string")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
    await AsyncStorage.setItem(KEY, JSON.stringify(cleaned));
}