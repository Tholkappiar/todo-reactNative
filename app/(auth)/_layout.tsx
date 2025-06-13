import { useConvexAuth } from "convex/react";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function Home() {
    const { isLoading, isAuthenticated } = useConvexAuth();
    console.log("is isAuthenticated : ", isAuthenticated);
    if (isLoading) {
        return <Text>Loading....</Text>;
    }

    if (!isAuthenticated) {
        return <Redirect href="/Signin" />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
