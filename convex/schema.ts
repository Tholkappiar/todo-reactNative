import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    ...authTables,
    todo: defineTable({
        id: v.id("users"),
        title: v.string(),
        completed: v.boolean(),
    }),
});
