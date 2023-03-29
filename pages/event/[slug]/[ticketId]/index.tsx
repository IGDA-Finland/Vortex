/* eslint-disable react/no-unescaped-entities */
import { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { SiDiscord, } from "react-icons/si";
import { FiShare2 } from "react-icons/fi";
import { RiTrophyFill } from "react-icons/ri";

import { Card, MobileCard } from '../../../../components/Card';
import { Button } from '../../../../components/Button';
import { getEvent, getTicket, signInWithDiscord } from '../../../../db';

import * as types from '../../../../types'

type TicketPageType = {
    event: types.EventType;
    ticket: types.TicketType;
    error: string;
}

const Ticket:NextPage<TicketPageType> = (props) => {
    const [width, setWidth] = useState(0);

    const handleWindowUpdate = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        handleWindowUpdate()
        window.addEventListener('resize', handleWindowUpdate);

        return () => {
            window.removeEventListener('resize', handleWindowUpdate);
        }
    }, []);

    return (
        <main className="flex flex-col justify-center items-center py-16 lg:py-0">
            <section className="min-h-screen w-full max-w-screen-xl grid grid-cols-1 xl:grid-cols-2 items-center gap-8 md:gap-2 px-8">

                <div className="flex flex-col items-center xl:items-start">
                    <h1 className="font-extrabold text-5xl text-center md:text-7xl md:text-left">You're In.</h1>
                    <h1 className="font-extrabold text-5xl text-center md:text-7xl md:text-left">Make it unique.</h1>

                    {!props.ticket.users.username && (
                        <div className="flex flex-col items-center xl:items-start">
                            <p className="my-8 text-2xl text-center md:text-left">Generate a unique ticket with Discord.</p>
                            <Button icon={<SiDiscord size={40} />} content="Generate with Discord" onClick={signInWithDiscord}/>
                            <p className="mt-4 text-sm">* Only public info will be used.</p>
                        </div>
                    )}

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <Link href={`/collection/${props.ticket.userId}`}>
                            <Button icon={<RiTrophyFill size={30} />} content="Collection" />
                        </Link>
                        <Link href={`/event/${props.ticket.eventSlug}/share/${props.ticket.ticketId}`}>
                            <Button icon={<FiShare2 size={30} />} content="Share" className="w-full" />
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                   { width > 425 ? <Card ticket={props.ticket} /> : <MobileCard ticket={props.ticket} /> }
                </div>
            </section>
        </main>
    )
}

export async function getServerSideProps(context: any) {
    const { data: eventData, error: eventError } = await getEvent(context.query.slug);
    const ticketData = await getTicket(context.query.ticketId);
    return { props: { event: eventData, ticket: ticketData, error: eventError } }
}

export default Ticket;