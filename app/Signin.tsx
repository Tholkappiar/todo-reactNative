import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignIn() {
    const { signIn } = useAuthActions();
    const [step, setStep] = useState<"signUp" | "signIn">("signIn");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View className="flex-1 justify-center items-center px-6 bg-white">
            <View className="w-full max-w-md space-y-4">
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-base text-gray-800"
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    inputMode="email"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                />
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-base text-gray-800"
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                    placeholderTextColor="#9CA3AF"
                />

                <Pressable
                    className="bg-blue-600 rounded-lg py-3 items-center"
                    onPress={() => {
                        void signIn("password", {
                            email,
                            password,
                            flow: step,
                        });
                    }}
                >
                    <Text className="text-white font-semibold text-base">
                        {step === "signIn" ? "Sign in" : "Sign up"}
                    </Text>
                </Pressable>

                <Pressable
                    className="mt-2 items-center"
                    onPress={() =>
                        setStep(step === "signIn" ? "signUp" : "signIn")
                    }
                >
                    <Text className="text-blue-600 text-sm font-medium">
                        {step === "signIn"
                            ? "Sign up instead"
                            : "Sign in instead"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
