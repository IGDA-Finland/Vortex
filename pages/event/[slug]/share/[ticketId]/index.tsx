/* eslint-disable react/no-unescaped-entities */
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { Card, MobileCard } from '../../../../../components/Card';
import EmailSignUp from '../../../../../components/Email-SignUp';

import { getEvent, getTicket } from '../../../../../db';

import * as types from '../../../../../types'

type TicketPageType = {
    event: types.EventType;
    ticket: types.TicketType;
    error: string;
}

const TicketShare:NextPage<TicketPageType> = (props) => {
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
                    <h1 className="font-extrabold text-5xl text-center md:text-6xl md:text-left">Event Name</h1>
                    <h1 className="font-extrabold text-5xl text-center md:text-4xl md:text-left mt-4">[Person's Name] Ticket</h1>

                    <p className="my-8 text-2xl text-center md:text-left">Register to get your ticket and stay tuned</p>
                    <div className="w-full max-w-md mt-4">
                        <EmailSignUp eventSlug={props.event.slug}/>
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

export default TicketShare;