import {
    ValidatedEventAPIGatewayProxyEvent,
    formatJSONResponse,
    formatUserErrorJSONResponse,
} from "@libs/apiGateway";

import { middyfy } from "@libs/middyfy";

import * as AWS from "aws-sdk";

import schema from "./schema";
import { FromSchema } from "json-schema-to-ts";

import { v4 as uuid } from "uuid";
import Notification from "src/model/Notification";
import { verifyAccessToken } from "@libs/utils";

const dbClient = new AWS.DynamoDB.DocumentClient();

const sendMessage: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {

    let usersData = await verifyAccessToken(event)

    if (usersData && usersData.statusCode === 400) {
        return formatUserErrorJSONResponse({
            message: `User Not authenticated`
        });
    }

    const messageInfo = event?.body;


    const newMessage = await sendNewMessage(messageInfo);

    return formatJSONResponse({
        message: newMessage,
    });
};


const sendNewMessage = async (
    messageInfo: FromSchema<typeof schema>
) => {
    const date = new Date();

    const payload = {
        TableName: process.env.GAMIFICATIONS_TABLE,
        Item: {
            id: uuid(),
            userId: messageInfo.userId,
            typeOfFeeling: messageInfo.typeOfFeeling,
            feelingMessage: messageInfo.feelingMessage,
            feelingEmoji: messageInfo.feelingEmoji,
            notiSetType: messageInfo.notiSetType,
            notiValue: messageInfo.notiValue,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
        },
    };
    await dbClient.put(payload).promise();

    return payload.Item as Notification;
};

export const main = middyfy(sendMessage);
