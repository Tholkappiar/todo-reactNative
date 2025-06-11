import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    Text,
    TextInput,
    TextInputChangeEventData,
    TouchableOpacity,
    View,
} from "react-native";
import { Plus } from "~/lib/icons/Plus";
import { Trash } from "~/lib/icons/Trash";
import { Checkbox } from "./ui/checkbox";

type todosType = {
    id: number;
    title: string;
    completed: boolean;
};

const Todo = () => {
    const [todos, setTodos] = useState<todosType[]>([]);
    const [todo, setTodo] = useState<string>("");
    const [count, setCount] = useState<number>(1);

    function changeChecked(id: number) {
        setTodos((prev) => {
            const updated = prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );

            updated.sort((a, b) => {
                if (Number(a.completed) !== Number(b.completed)) {
                    return Number(a.completed) - Number(b.completed);
                }
                return Number(a.id) - Number(b.id);
            });
            return updated;
        });
    }

    function onChangeInput(
        event: NativeSyntheticEvent<TextInputChangeEventData>
    ) {
        setTodo(event.nativeEvent.text.trim());
    }

    function onTodoSubmit() {
        if (todo.length > 0) {
            setTodos((prev) => [
                ...prev,
                {
                    id: count,
                    title: todo,
                    completed: false,
                },
            ]);
            setCount((prev) => prev + 1);
            setTodo("");
        }
    }

    function onTodoDelete(id: number) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    return (
        <View className="flex-1 pt-10 justify-between bg-gray-200">
            <View>
                <Text className="mb-8 text-5xl text-center font-bold">
                    Todo
                </Text>
                {todos.length === 0 && (
                    <Text className="text-center text-gray-700 font-medium mt-20">
                        No items in the list. Please add something
                    </Text>
                )}
                <View className="justify-start mx-10 gap-3">
                    {todos.map((todo) => (
                        <View
                            key={todo.id}
                            className="flex-row justify-between"
                        >
                            <View className="flex-row gap-4">
                                <Checkbox
                                    checked={todo.completed}
                                    onCheckedChange={() =>
                                        changeChecked(todo.id)
                                    }
                                    className="bg-white"
                                />
                                <Text
                                    className={
                                        todo.completed ? "line-through" : ""
                                    }
                                >
                                    {todo.title}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => onTodoDelete(todo.id)}
                            >
                                <Trash size={20} className="text-red-500" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            <KeyboardAvoidingView
                className="flex-row items-center gap-2 m-6"
                behavior="padding"
                keyboardVerticalOffset={40}
            >
                <TextInput
                    placeholder="Add a Todo"
                    className="p-4 flex-1 rounded-lg bg-white"
                    onChange={onChangeInput}
                    value={todo}
                />
                <TouchableOpacity onPress={onTodoSubmit}>
                    <Plus className="bg-blue-500 p-5 rounded-md text-white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Todo;
