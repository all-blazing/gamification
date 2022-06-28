import { formatUserErrorJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/middyfy";
import { verifyAccessToken } from "@libs/utils";

import { getNotificationsByUserIdQuery } from '@libs/dynamoQueries'

import * as AWS from 'aws-sdk';
import Notification from "src/model/Notification";

const dbClient = new AWS.DynamoDB.DocumentClient();

const getGamificationNotification: ValidatedEventAPIGatewayProxyEvent<any> = async (
    event
) => {

    let usersData = await verifyAccessToken(event)

    if (usersData && usersData.statusCode === 400) {
        return formatUserErrorJSONResponse({
            message: `User Not authenticated`
        });
    }
    const userId = event?.pathParameters?.userId;

    const notification = await getNotifications(userId);

    return formatJSONResponse({
        notification
    });
};

const getNotifications = async (userId: string) => {
    return (await dbClient.query(getNotificationsByUserIdQuery(userId)).promise())
        .Items as Notification[]
}

export const main = middyfy(getGamificationNotification);
