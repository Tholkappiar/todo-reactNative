import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";
import SignIn from "./Signin";

const Index = () => {
    const { isAuthenticated } = useConvexAuth();
    console.log("is Authenticated : ", isAuthenticated);
    return (
        <View className="flex-1">
            <Authenticated>
                <Redirect href="/(tabs)/Todo" />
            </Authenticated>
            <Unauthenticated>
                <SignIn />
            </Unauthenticated>
        </View>
    );
};

export default Index;
