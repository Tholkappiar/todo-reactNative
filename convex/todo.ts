import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("todo").collect();
    },
});

export const postTodo = mutation({
    args: { title: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todo", {
            title: args.title,
            completed: false,
        });
        return todoId;
    },
});

export const deleteTodo = mutation({
    args: { _id: v.id("todo") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args._id);
    },
});

export const updateTodo = mutation({
    args: { id: v.id("todo"), completed: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            completed: args.completed,
        });
    },
});
