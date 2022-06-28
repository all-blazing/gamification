import type {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
    body: FromSchema<S>;
    queryStringParameters: NonNullable<AWSLambda.APIGatewayProxyEvent["queryStringParameters"]>;
    pathParameters: NonNullable<AWSLambda.APIGatewayProxyEvent["pathParameters"]>;
};

export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
    ValidatedAPIGatewayProxyEvent<S>,
    APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};

export const formatUserErrorJSONResponse = (response: Record<string, unknown>) => {
    return {
        statusCode: 400,
        body: JSON.stringify(response),
    };
};
