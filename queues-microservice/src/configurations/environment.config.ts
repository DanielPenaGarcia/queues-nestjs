import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
    ws: {
        port: parseInt(process.env.WS_PORT!),
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    api: {
        port: parseInt(process.env.API_PORT!),
        key: process.env.API_KEY
    },
    redis: {
        port: parseInt(process.env.RS_PORT!),
        host: process.env.RS_HOST,
        password: process.env.RS_PASS
    },
    front: {
        url: process.env.FRONTEND_URL
    }
}