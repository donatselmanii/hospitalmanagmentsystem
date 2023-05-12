import jwt from 'jsonwebtoken';

export const decodeTokenAndGetUserIdNum = (token) => {
    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, 'your-secret-key');

        // Extract the 'idnum' value from the decoded token
        const userIdNum = decodedToken.idnum;

        return userIdNum;
    } catch (error) {
        console.error('Error decoding token:', error);
        // Handle the error, such as returning a default value or throwing an exception
    }
};
