import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest } from 'next';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import * as types from './types';

export const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_PUBLIC_KEY || '');

export const setAuthCookie = async(event: AuthChangeEvent, session: Session | null) => {
    return await axios({
        method: 'POST',
        url: `${process.env.API_URL}/auth`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ event, session }),
    })
}

//export const signIn = async(provider: 'google' | 'twitter') => await supabase.auth.signIn({ provider })

export const getUser = async () => await supabase.auth.getUser();

//export const getUserByCookie = async (req: NextApiRequest) => await supabase.auth.api.getUserByCookie(req)

export const getIsAdmin = async () => {
    const auth = localStorage.getItem('supabase.auth.token')
    if(auth) {
        const { currentSession }= JSON.parse(auth)
        const data = await axios({
            method: 'GET',
            url: `${process.env.API_URL}/getAdmin` || '',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentSession.access_token
            }
        })
        .then(res => res.data)
        .catch(error => error.response.data)
    
        return data
    }
}

export const storeTicket = async(eventSlug: string, email: string) => {
    const headers: any = {
        'Content-Type': 'application/json'
    }

    const data = await axios({
        method: 'POST',
        url: `${process.env.API_URL}/postTicket`,
        data: JSON.stringify({
            eventSlug,
            email
        }),
        headers
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export async function updateDiscordUser() {
    const user = await supabase.auth.getSession();

    if(user && user.data.session) {
        const headers: any = {
            'Content-Type': 'application/json',
            'token': user.data.session.access_token
        }

        const data = await axios({
            method: 'POST',
            url: `${process.env.API_URL}/putDiscordUser`,
            data: {},
            headers
        })
        .then(res => res.data)
        .catch(error => error.response.data)

        return data;
    }
}