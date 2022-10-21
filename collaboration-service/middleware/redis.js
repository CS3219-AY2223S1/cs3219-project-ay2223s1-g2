import { createClient } from "redis";
import moment from "moment";
export const client = createClient();

client.on("connect", () =>
    console.log("Collaboration client connected to Redis")
);

client.on("ready", () => console.log("Redis Ready"));

client.on("error", (err) => console.error(`Redis Connection Error ${err}`));

client.on("end", () =>
    console.log("CollaborationClient disconnected from Redis")
);

process.on("SIGINT", () => {
    client.quit();
});

await client.connect();

export const setRoomId = async (roomId) => {
    const dto = {
        created: moment(),
        updated: moment(),
    };
    await setObject(`${roomId}:info`, dto);
};

export const delKey = async (key) => {
    await client.del(key);
};

export const setObject = async (key, object) => {
    await client.set(key, JSON.stringify(object)).catch((err) => {
        console.error(1, err);
    });
};

// lPush object can be string or array
export const lpush = async (key, object) => {
    await client.lPush(key, object).catch((err) => {
        console.error(1, err);
    });
};

export const lRangeKey = async (key, start, end) => {
    const range = await client.lRange(key, start, end).catch((err) => {
        console.error(1, err);
    });
    return range;
};

export const setString = async (key, string) => {
    await client.set(key, string).catch((err) => {
        console.error(1, err);
    });
};

export const getString = async (key) => {
    return await client.get(key).catch((err) => {
        console.error(1, err);
    });
};

export const getObject = async (key) => {
    const result = await client.get(key);
    return JSON.parse(result);
};
