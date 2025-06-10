import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const index = () => {
    return (
        <View>
            <Text>this is the initial page</Text>
            <Link href="/screens" push={true}>
                Go to home
            </Link>
            <Link href="/screens/settings" push={true}>
                Go to settings
            </Link>
        </View>
    );
};

export default index;
