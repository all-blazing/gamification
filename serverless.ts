import type { AWS } from "@serverless/typescript";

import sendGamificationNotification from "@functions/add-notification";

import { DynamoResources } from "src/resources/DynamoResources";
import {
    GamificationTableIAMRoleStatement
} from "src/security/IamRoleStatements";

import getNotification from "src/functions/get-notification"

const serverlessConfiguration: AWS = {
    org: "adminallblazing",
    app: "allblazing",
    service: "gamification",
    frameworkVersion: "2",
    plugins: [
        "serverless-esbuild",
        "serverless-offline",
        "serverless-dynamodb-local",
        "serverless-dotenv-plugin",
    ],
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        region: "eu-west-1",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            GAMIFICATIONS_TABLE: "gamifications-${opt:stage, 'dev'}",
            GAMIFICATION_USERID_INDEX_NAME: 'GamificationsUserIdIndex',
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        iamRoleStatements: [
            GamificationTableIAMRoleStatement
        ],
        lambdaHashingVersion: "20201221",
    },
    resources: {
        Resources: {
            ...DynamoResources,
        },
    },
    functions: {
        sendGamificationNotification, getNotification
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node14",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
        dynamodb: {
            stages: ["dev"],
            start: {
                port: 15002,
            },
        },
    },
};

module.exports = serverlessConfiguration;
