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

export const getUser = () => supabase.auth.getUser();

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