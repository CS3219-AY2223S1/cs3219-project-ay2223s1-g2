import { createClient } from "redis";
import { extractSubstring } from "../common/common.js";
export const client = createClient();

client.on("connect", () => console.log("Client connected to Redis"));

client.on("ready", () => console.log("Redis Ready"));

client.on("error", (err) => console.error(`Redis Connection Error ${err}`));

client.on("end", () => console.log("Client disconnected from Redis"));

process.on("SIGINT", () => {
    client.quit();
});

await client.connect();

export const blacklistToken = async (token) => {
    const tokenKey = extractSubstring(token, 1, " ");
    await client.set(tokenKey, 0);
};

export const checkIfTokenBlacklisted = async (token) => {
    const tokenKey = extractSubstring(token, 1, " ");
    const isBlacklisted = await client.get(tokenKey);
    return isBlacklisted === "0";
};
