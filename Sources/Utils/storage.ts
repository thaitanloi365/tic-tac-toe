import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadString(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

export async function saveString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
