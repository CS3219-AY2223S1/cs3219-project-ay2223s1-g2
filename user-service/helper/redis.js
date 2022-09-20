import { createClient } from "redis";

export const client = createClient();

client.on("connect", () => console.log("Client connected to Redis"));

client.on("ready", () => console.log("Redis Ready"));

client.on("error", (err) => console.error(`Redis Connection Error ${err}`));

client.on("end", () => console.log("Client disconnected from Redis"));

process.on("SIGINT", () => {
    client.quit();
});

await client.connect();

//Work on this
export const blacklistToken = async (token) => {
    await client.set(token, 0);
    return true;
};

export const checkIfTokenBlacklisted = async (token) => {
    const isBlacklisted = await client.get(token);
    console.log(isBlacklisted === "0");
    return isBlacklisted === "0";
};
