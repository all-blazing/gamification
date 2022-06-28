export default {
    type: "object",
    properties: {
        userId: { type: "string" },
        // typeOfFeeling: { type: "string" },
        feelingMessage: { type: "string" },
        feelingEmoji: { type: "string" },
        notiSetType: { type: "string" },
        notiValue: { type: "string" },
    },
    required: ["userId", "feelingMessage", "feelingEmoji", "notiSetType", "notiValue"],
} as const;
