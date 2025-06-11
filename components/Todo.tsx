import { useMutation, useQuery } from "convex/react";
import React, { useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    Text,
    TextInput,
    TextInputChangeEventData,
    TouchableOpacity,
    View,
} from "react-native";
import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import { Plus } from "~/lib/icons/Plus";
import { Trash } from "~/lib/icons/Trash";
import { AlertDialogScreen } from "./AlertExample";
import { Checkbox } from "./ui/checkbox";

const Todo = () => {
    const todos = useQuery(api.todo.getTodos) || [];
    const updateTodo = useMutation(api.todo.updateTodo);
    const postTodo = useMutation(api.todo.postTodo);
    const deleteTodo = useMutation(api.todo.deleteTodo);

    const [todo, setTodo] = useState<string>("");

    const [dialogStatus, setDialogStatus] = useState<boolean>(false);
    const [selectedTodoId, setSelectedTodoId] = useState<Id<"todo"> | null>(
        null
    );

    async function changeChecked(id: Id<"todo">) {
        const currentTodo = todos.find((todo) => todo._id === id);
        if (currentTodo) {
            await updateTodo({ id, completed: !currentTodo.completed });
        }
    }

    function onChangeInput(
        event: NativeSyntheticEvent<TextInputChangeEventData>
    ) {
        setTodo(event.nativeEvent.text.trim());
    }

    async function onTodoSubmit() {
        if (todo.length > 0) {
            await postTodo({ title: todo });
        }
        setTodo("");
    }

    const sortedTodos = useMemo(() => {
        return todos.sort((a, b) => {
            if (a.completed !== b.completed) {
                return Number(a.completed) - Number(b.completed);
            }
            return a._creationTime - b._creationTime;
        });
    }, [todos]);

    function handleDeletePress(todoId: Id<"todo">) {
        setDialogStatus(true);
        setSelectedTodoId(todoId);
    }

    async function confirmDelete() {
        if (selectedTodoId != null) {
            await deleteTodo({ _id: selectedTodoId });
        }
        setSelectedTodoId(null);
        setDialogStatus(false);
    }

    function cancelDelete() {
        setSelectedTodoId(null);
        setDialogStatus(false);
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
                    {sortedTodos.map((todo) => (
                        <View
                            key={todo._id}
                            className="flex-row justify-between items-center"
                        >
                            <View className="flex-row gap-4 items-center">
                                <Checkbox
                                    checked={todo.completed}
                                    onCheckedChange={() =>
                                        changeChecked(todo._id)
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
                                onPress={() => handleDeletePress(todo._id)}
                            >
                                <Trash size={20} className="text-red-500" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
            <AlertDialogScreen
                dialogStatusFlag={dialogStatus}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
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
