import { NextPage } from 'next';
import Link from 'next/link';
import { CardThumbnail } from '../../../components/Card';
import { getTickets } from '../../../db';

import * as types from '../../../types'

type CollectionPageType = {
    tickets: types.TicketType[];
    error: string;
}

const Collection:NextPage<CollectionPageType> = (props) => {
    return (
        <main className="flex flex-col items-center min-h-screen py-16">
            <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 w-full max-w-screen-lg gap-x-12 gap-y-16 px-8">
                {props.tickets.map((ticket, i) => (
                    <Link href={`/event/${ticket.eventSlug}/share/${ticket.ticketId}`} key={i}>
                        <CardThumbnail ticket={ticket} key={i}/> 
                    </Link>
                ))}
            </section>
        </main>
    )
}

export async function getServerSideProps(context: any) {
    const { data: ticketData, error: ticketError } = await getTickets(context.query.slug);
    return { props: { tickets: ticketData, error: ticketError }}
}

export default Collection;