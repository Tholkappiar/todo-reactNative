import { Authenticated, Unauthenticated } from "convex/react";
import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";
import SignIn from "./Signin";

const Index = () => {
    return (
        <View className="flex-1">
            <Authenticated>
                <Redirect href="/(auth)/(tabs)/Profile" />
            </Authenticated>
            <Unauthenticated>
                <SignIn />
            </Unauthenticated>
        </View>
    );
};

export default Index;
