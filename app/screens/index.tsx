import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const home = () => {
    return (
        <View>
            <Text>home</Text>
            <Link href="/" push={true}>
                Go to index
            </Link>
        </View>
    );
};

export default home;
