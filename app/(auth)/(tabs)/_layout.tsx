import { Tabs } from "expo-router";
import React from "react";
import { ListTodo } from "~/lib/icons/ListTodo";
import { User } from "~/lib/icons/User";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="Todo"
                options={{
                    title: "Todo",
                    tabBarIcon: ({ color, size }) => (
                        <ListTodo color={color} size={20} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <User color={color} size={20} />
                    ),
                }}
            />
        </Tabs>
    );
}
