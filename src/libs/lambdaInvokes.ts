// import * as AWS from "aws-sdk";

// const lambda = new AWS.Lambda({
//     region: "eu-west-1", //change to your region
// });

// interface Payload {
//     userId: string;
// }

// export const sendNotification = async (
//     userIds: string[],
//     message: string,
//     title: string,
//     payload?: Payload
// ) => {
//     await lambda
//         .invoke({
//             FunctionName: process.env.SEND_NOTIFICATION_FUNCTION_NAME,
//             Payload: JSON.stringify({ ids: userIds, message, title, payload }),
//         })
//         .promise();
// };
