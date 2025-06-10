import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ title: "Home Page" }} />
                <Stack.Screen name="screens" options={{ title: "Home Page" }} />
                <Stack.Screen name="screens/settings" />
            </Stack>
        </SafeAreaView>
    );
}
