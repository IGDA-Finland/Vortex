import Link from 'next/link'

import { FiUser } from "react-icons/fi";

const Organization = () => {
    return (
        <main className="flex">
            <section className="w-1/3 bg-black h-screen flex flex-col justify-end p-6">
                <h1 className="title-font text-7xl">IGDA Helsinki</h1>
            </section>
            <section className="flex flex-col w-full">
                <section className="border-b border-slate-400 w-full h-14 flex justify-between">
                    <nav className="flex">
                        <Link href="/" className="flex items-center justify-center w-44 border-r border-slate-400 h-14 text-2xl title-font">
                            <span>Events</span>
                        </Link>
                        <Link href="/" className="flex items-center justify-center w-44 border-r border-slate-400 h-14 text-2xl title-font">
                            <span>Team</span>
                        </Link>
                    </nav>
                    <section>
                        <Link href="/" className="flex items-center justify-center w-14 border-l border-slate-400 h-14 text-2xl">
                            <FiUser />
                        </Link>
                    </section>
                </section>
                <section className="flex flex-col w-full items-center py-14">
                    <Link href={`/event/digihub-meetup`} className="w-3/5 h-48 bg-black rounded-xl mb-8 flex flex-col justify-end overflow-hidden">
                        <section className="bg-white/[.10] text-white w-full h-16 flex justify-between items-center px-4 backdrop-blur-md">
                            <h2 className="text-4xl title-font">IGDA Helsinki x Next Games</h2>
                            <p className="text-2xl title-font">20.03.23 - 17:00</p>
                        </section>
                    </Link>
                    <article className="w-3/5 h-48 bg-black rounded-xl p-4 mb-8"></article>
                </section>
            </section>
        </main>
    )
}

export default Organization