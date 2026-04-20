import { Context, Next } from 'hono';
import { Env } from '../types.js';
export declare const authMiddleware: (c: Context<Env>, next: Next) => Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, 401, "json">) | undefined>;
//# sourceMappingURL=auth.d.ts.map