import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Todo from "~/components/Todo";

const Index = () => {
    return (
        <SafeAreaView className="flex-1">
            <Todo />
        </SafeAreaView>
    );
};

export default Index;
