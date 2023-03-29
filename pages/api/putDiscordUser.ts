import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByToken, getUser, updateDiscordUser } from '../../db';

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    eventSlug: string;
    ticketId: number;
}

type ResponseError = {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseOptions | ResponseData | ResponseError>
) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({
            body: 'OK'
        })
    }

    if (req.method !== 'POST') {
        return res.status(401).json({ error: 'Not Allowed' });
    }

    const token = req.headers.token;
    if (!token || typeof token !== 'string') {
        return res.status(401).json({
            error: 'Missing token'
        })
    }

    const authUser = await getUserByToken(token);
    if(!authUser || !authUser.data.user || !authUser.data.user.email) {
        return res.status(401).json({
            error: 'Missing Discord User'
        })
    }
    
    const user = await getUser(authUser.data.user.email);
    if(!user) {
        return res.status(404).json({
            error: 'User does not exist'
        })
    }

    await updateDiscordUser(
        user.userId,
        {
            avatar: authUser.data.user.user_metadata.avatar_url,
            name: authUser.data.user.user_metadata.full_name,
            username: authUser.data.user.user_metadata.name
        }
    );

    return user.userId
}