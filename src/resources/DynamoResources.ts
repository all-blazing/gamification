import type { AWS } from "@serverless/typescript";

const DynamoResources: AWS["resources"]["Resources"] = {
    GamificationTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
            TableName: "${self:provider.environment.GAMIFICATIONS_TABLE}",
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "S" },
                { AttributeName: "userId", AttributeType: "S" }
            ],
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH" }
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: "${self:provider.environment.GAMIFICATION_USERID_INDEX_NAME}",
                    KeySchema: [
                        { AttributeName: "userId", KeyType: "HASH" }
                    ],
                    Projection: {
                        ProjectionType: "ALL"
                    }
                }
            ],
            BillingMode: "PAY_PER_REQUEST"
        }
    }
};

export { DynamoResources };
