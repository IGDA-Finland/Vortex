import { createClient } from '@supabase/supabase-js';
const supabaseClient = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_PUBLIC_KEY || '');
const supabaseServer = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_PRIVATE_KEY || '');
import * as types from './types';

export const getEvent = async(slug: string): Promise<({ data: types.EventType | null, error: string | null })> => {
    const { data, error } = await supabaseClient.from('events').select('id, title, slug, start_at, end_at, locationType').eq('slug', slug).eq('archived', false);
    return {
        data: data ? data[0] : null,
        error: error ? error.message : null
    }
}

export const getTickets = async(userId: string) => await supabaseClient.from('tickets').select('userId, eventSlug, ticketId, events(title, locationType, start_at, eventImage), users(avatar, name, username)').eq('userId', userId);

export const getTicket = async (ticketId: string) => {
    const { data } = await supabaseClient.from('tickets').select('userId, eventSlug, ticketId, events(title, locationType, start_at, eventImage), users(avatar, name, username)').eq('ticketId', ticketId);
    if(data) {
        return data[0];   
    }

    return undefined;
}

export const getTicketByUserId = async (eventSlug: string, userId: string) => {
    const { data } = await supabaseClient.from('tickets').select('ticketId').eq('eventSlug', eventSlug).eq('userId', userId);
    if (data) {
        return data[0];
    }

    return undefined;
}

export const storeTicket = async (eventSlug: string, userId: string) => {
    const ticketId = Math.floor(Math.random()*1000000000);

    const { data } = await supabaseServer.from('tickets').insert({
        userId,
        eventSlug,
        ticketId
    }).select('eventSlug, ticketId');

    if(data) {
        return data[0];
    }

    return undefined;
}

export const getUser = async (email: string) => {
    const { data } = await supabaseClient.from('users').select('userId').eq('email', email);
    if (data) {
        return data[0];
    }

    return undefined;
}

export const storeUser = async (email: string) => {
    const userId = Math.floor(Math.random()*1000000000);

    const { data } = await supabaseServer.from('users').insert({
        email,
        userId
    }).select('userId');

    if (data) {
        return data[0];
    }

    return undefined;
}

export async function getUserByToken(token: string) {
    const user = supabaseServer.auth.getUser(token);
    if(user) {
        return user;
    }
    
    return undefined;
}

export async function signInWithDiscord() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'discord',
    })
}

export async function updateDiscordUser(userId: string, data: {avatar: string | null, name: string, username: string }) {
    const user = await supabaseServer.from('users').update({
        avatar: data.avatar,
        name: data.name,
        username: data.username
    })
    .eq('userId', userId);

    return user;
}

export const storeEvent = async (eventData: types.EventType) => {
    const {slug, title, start_at, end_at, locationType} = eventData;

    const { data } = await supabaseServer.from('events').insert({
        slug,
        title,
        start_at,
        end_at,
        locationType
    }).select('slug');

    if (data) {
        return data[0];
    }

    return undefined;
}

export const storeSession = async (sessionData: types.SessionType) => {
    const { title, description, start_at, end_at, speaker, location, eventSlug, slug } = sessionData;

    const { data } = await supabaseServer.from('sessions').insert({
        title,
        description,
        start_at,
        end_at,
        speaker,
        location,
        eventSlug,
        slug
    }).select('title');

    if (data) {
        return data[0];
    }

    return undefined;
}

export const storeSpeaker = async (speakerData: types.SpeakerType) => {
    const { name, slug, position, bio, image, social } = speakerData;

    const { data } = await supabaseServer.from('speakers').insert({
        name,
        slug,
        position,
        bio,
        image,
        social
    }).select('slug');

    if (data) {
        return data[0];
    }

    return undefined;
}