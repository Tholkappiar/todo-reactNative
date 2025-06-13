import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const getUserIdentity = query({
    handler: async (ctx) => {
        const userID = await getAuthUserId(ctx);
        const user = await ctx.db
            .query("users")
            .filter((data) => data.eq(data.field("_id"), userID))
            .first();
        return user;
    },
});
