import Link from 'next/link';
import { Button } from './Button';

const EventHeader = () => {
    return (
        <header>
            <section></section>
            <nav>
                <Link href="#">Schedule</Link>
                <Link href="#">Speakers</Link>
                <Link href="#">Volunteers</Link>
            </nav>
            <section>
                <Button content="New Event" />
            </section>
        </header>
    )
}

export default EventHeader;