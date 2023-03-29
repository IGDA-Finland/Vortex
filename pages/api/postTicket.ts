import type { NextApiRequest, NextApiResponse } from 'next';
import { getEvent, getTicketByUserId, storeTicket, getUser, storeUser } from '../../db';

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

    const { email, eventSlug } = req.body;

    if (!email || typeof email !== 'string') {
        return res.status(401).json({
            error: 'Missing e-mail'
        })
    }

    const emailInput = email.trim();
    if(!emailInput || emailInput.length === 0) {
        return res.status(401).json({
            error: 'Missing e-mail'
        })
    }

    if(!eventSlug || typeof eventSlug !== 'string') {
        return res.status(401).json({
            error: 'Missing event'
        })
    }

    let userId = null;
    const user = await getUser(emailInput);
    if(user) {
        userId = user.userId;
    } else {
        const userData = await storeUser(emailInput);
        if(!userData) {
            return res.status(401).json({
                error: 'Creating userId'
            })
        }

        userId = userData.userId;
    }

    const event = await getEvent(eventSlug);
    if(!event.data || event.error) {
        return res.status(401).json({
            error: 'Event not found'
        })
    }

    const ticketExists = await getTicketByUserId(event.data.slug, userId);
    if(ticketExists) {
        return res.status(200).json({
            eventSlug: event.data.slug,
            ticketId: ticketExists.ticketId
        })
    }

    const ticket = await storeTicket(event.data.slug, userId);
    if(!ticket) {
        return res.status(401).json({
            error: 'Error storing ticket'
        })
    }

    return res.status(200).json({
        eventSlug: event.data.slug,
        ticketId: ticket.ticketId
    });
}