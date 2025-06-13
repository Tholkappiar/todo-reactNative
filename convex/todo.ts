import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("todo")
            .filter((data) => data.eq(data.field("id"), args.id))
            .collect();
    },
});

export const postTodo = mutation({
    args: { id: v.id("users"), title: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todo", {
            id: args.id,
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
