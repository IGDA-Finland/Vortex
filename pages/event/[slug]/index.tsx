import type { NextPage } from 'next'
import Link from 'next/link'

import { FiArrowRight, FiTwitch, FiYoutube } from "react-icons/fi";

import { getEvent } from '../../../db'
import EmailSignUp from '../../../components/Email-SignUp'

import * as types from '../../../types'

type EventPage = {
    event: types.EventType
    error: string
}

const Event: NextPage<EventPage> = (props) => {
    return (
        <main className="flex flex-col justify-center items-center">
            <section className="min-h-screen w-full max-w-screen-lg flex flex-col justify-center items-center px-4">
                <h1 className="font-extrabold text-4xl md:text-8xl text-center animate-fadeIn animation-delay-1 animation-timing-cubic opacity-0">{props.event.title}</h1>
                <div className="flex flex-col md:flex-row text-2xl md:text-3xl my-8 items-center animate-fadeIn animation-delay-2 animation-timing-cubic opacity-0">
                    <h3>14 December 2022</h3>
                    <p className="mx-4 hidden md:flex">|</p>
                    <h3 className="font-bold uppercase">Live</h3>
                </div>
                <div className="w-full max-w-md animate-fadeIn mt-12 animation-delay-3 animation-timing-cubic opacity-0">
                    <EmailSignUp eventSlug={props.event.slug} />
                </div>
                <div className="w-full max-w-md animate-fadeIn mt-12 animation-delay-3 animation-timing-cubic opacity-0">
                    <Link href="/sessions" className="flex items-center justify-center bg-black text-white text-2xl py-4 rounded-xl">
                        <p className="mr-4">Watch on Twitch</p>
                        <FiTwitch size={32} />
                    </Link>
                    <Link href="/sessions" className="flex items-center justify-center bg-black text-white text-2xl py-4 rounded-xl mt-4">
                        <p className="mr-4">Q&A Sessions</p>
                        <FiArrowRight size={32} />
                    </Link>
                </div>
            </section>
        </main>
    )
}

export async function getServerSideProps(context: any) {
    const { data, error } = await getEvent(context.query.slug)
    return { props: { event: data, error } }
}

export default Event