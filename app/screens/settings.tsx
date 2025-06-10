import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const settings = () => {
    return (
        <View>
            <Text>settings</Text>
            <Link href="/" push={true}>
                Go to main page
            </Link>
        </View>
    );
};

export default settings;
