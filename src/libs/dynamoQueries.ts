// export const queryChannelByUsers = (
//     users: string
// ) => {
//     return {
//         TableName: process.env.CHANNELS_TABLE,
//         IndexName: process.env.CHANNELS_USERS_INDEX_NAME,
//         KeyConditionExpression: "#users = :users",
//         ExpressionAttributeNames: {
//             "#users": "users",
//         },
//         ExpressionAttributeValues: {
//             ":users": users
//         },
//     };
// };

export const getNotificationsByUserIdQuery = (userId: string) => {
    return {
        TableName: process.env.GAMIFICATIONS_TABLE,
        IndexName: process.env.GAMIFICATION_USERID_INDEX_NAME,
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
            "#userId": "userId",
        },
        ExpressionAttributeValues: {
            ':userId': userId,
        },
    }
}

// export const getChannelByChannelId = (
//     channelId: string
// ) => {
//     return {
//         TableName: process.env.CHANNELS_TABLE,
//         Key: { channelId: channelId },
//     };
// };

// export const queryMessagesByChannelId = (
//     channelId: string
// ) => {
//     return {
//         TableName: process.env.MESSAGES_TABLE,
//         IndexName: process.env.MESSAGES_CHANNEL_ID_INDEX_NAME,
//         KeyConditionExpression: "#channelId = :channelId",
//         ExpressionAttributeNames: {
//             "#channelId": "channelId",
//         },
//         ExpressionAttributeValues: {
//             ":channelId": channelId
//         },
//     };
// };