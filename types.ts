export type ActionType = '';

export type Action = {
    type: ActionType;
    value: any;
};

export type State = {

};

export type OrganizationType = {
    name: string;
    slug: string;
};

export type TeamType = {
    name: string;
    slug: string;
    organizationSlug: string;
};

export type UserType = {
    email: string;
    userId: string;
    avatar: string;
    name: string;
    username: string;
};

export type EventType = {
    id?: number;
    title: string;
    slug: string;
    start_at: string;
    end_at: string;
    locationType: LocationType;
};

export type SessionType = {
    id?: number;
    title: string;
    description: string;
    start_at: string;
    end_at: string;
    speaker: number;
    location: string;
    eventSlug: string;
    slug: string;
};

export type SpeakerType = {
    id?: number;
    name: string;
    slug: string;
    position: string;
    bio: string;
    image: string;
    social: Record<string, string>;
};

export type TicketType = {
    userId: string;
    ticketId: number;
    eventSlug: string;
    events: {
        title: string;
        locationType: LocationType;
        start_at: string;
        eventImage: string | null;
    };
    users: {
        avatar: string;
        name: string;
        username: string;
    }
};

export type LocationType = 'online' | 'hybrid' | 'live';