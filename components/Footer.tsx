import Link from 'next/link';

const Footer = () => (
    <footer className="w-full h-16 bg-black flex justify-between items-center px-4 text-gray-400 text-xs">
        <p>Copyright © 2022 Digihub Inc. All rights reserved.</p>
        <nav className="flex">
            <Link href="/">Source Code</Link>
            <div className="mx-2">|</div>
            <Link href="/">Code of Conduct</Link>
            <div className="mx-2">|</div>
            <Link href="/">Legal</Link>
        </nav>
    </footer>
)

export default Footer;