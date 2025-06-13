import "./global.css";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import {
    DarkTheme,
    DefaultTheme,
    Theme,
    ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
});

const secureStorage = {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync,
};

export default function RootLayout() {
    const hasMounted = React.useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }

        if (Platform.OS === "web") {
            // Adds the background color to the html element to prevent white background on overscroll.
            document.documentElement.classList.add("bg-background");
        }
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <SafeAreaProvider>
                <SafeAreaView className="flex-1">
                    <ConvexAuthProvider
                        client={convex}
                        storage={
                            Platform.OS === "android" || Platform.OS === "ios"
                                ? secureStorage
                                : undefined
                        }
                    >
                        {/* <StatusBar style={isDarkColorScheme ? "light" : "dark"} /> */}
                        {/* <Stack screenOptions={{ headerShown: false }} /> */}
                        <Stack screenOptions={{ headerShown: false }} />

                        <PortalHost />
                    </ConvexAuthProvider>
                </SafeAreaView>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

const useIsomorphicLayoutEffect =
    Platform.OS === "web" && typeof window === "undefined"
        ? React.useEffect
        : React.useLayoutEffect;
