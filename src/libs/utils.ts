import jwt from 'jsonwebtoken'
import { formatUserErrorJSONResponse } from "./apiGateway";

var SECRET_KEY = "MySecretKey1"

export const getAuthResponse = async (user) => {
    if (!SECRET_KEY) {
        return new Error("Secret key not found")
    }

    const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: '2d' });

    return accessToken;

}

export const verifyAccessToken = async (event: any) => {
    try {
        const token = event.headers.Authorization || event.headers.authorization;

        if (!token) {
            return formatUserErrorJSONResponse({
                message: `Token not found`
            })
        }

        const decoded = await jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        return decoded;

    } catch (error) {
        return formatUserErrorJSONResponse({
            message: `Please enter valid token`
        })
    }
}
