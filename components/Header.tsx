import Link from 'next/link';
import { useState } from 'react';
import { Button } from './Button';
import Drawer from './Drawer';

import { FiSearch, FiUser } from "react-icons/fi";

const Header = () => {
    const [showNewEvent, setShowNewEvent] = useState(false);

    return (
        <>
            <header className="w-full flex justify-center p-2 absolute">
                <section className="w-full px-8 flex justify-between items-center">
                    <section>Vortex</section>
                    <nav className="grid grid-cols-2 gap-2">
                        <Button icon={<FiSearch size={24} />} onClick={() => setShowNewEvent(!showNewEvent)}/>
                        <Button icon={<FiUser size={24} />} onClick={() => setShowNewEvent(!showNewEvent)}/>
                    </nav>
                    {/*<section>
                        <Button content="New Event" onClick={() => setShowNewEvent(!showNewEvent)}/>
    </section>*/}
                </section>
            </header>
            <Drawer show={showNewEvent} setShow={setShowNewEvent}/>
        </>
       
    )
}

export default Header;