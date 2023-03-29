import { NextPage } from 'next';
import router from 'next/router';
import { useRef, useState } from 'react';

import { Button } from './Button';
import { ThreeDots } from './Loading';

import { FiCheck } from 'react-icons/fi';

import { storeTicket } from '../actions';

type EmailSignUpType = {
    eventSlug: string;
}

const EmailSignUp:NextPage<EmailSignUpType> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleStoreTicket = async() => {
        if(emailRef.current) {
            setIsLoading(true);
            
            const response = await storeTicket(props.eventSlug, emailRef.current.value);
            if(response.error) {
                console.log(response.error);
            } else {
                emailRef.current.value = '';
                router.push(`/event/${response.eventSlug}/${response.ticketId}`);
            }

            setIsLoading(false);
        }
    }

    return (
        <div className="flex w-full p-2 bg-gray-300 rounded-xl focus-within:bg-gray-200 transition-colors">
            <label htmlFor="email-input" className="flex-grow">
                <input type="email" placeholder="Enter your e-mail" ref={emailRef} className="h-full w-full bg-transparent outline-none px-2 text-black" id="email-input" autoComplete="off" aria-label="Your email address" required/>
            </label>
            <div className="block md:hidden">
                <Button icon={<FiCheck size={20} />} />
            </div>
            <div className="hidden md:block h-14">
                {isLoading ? <Button icon={<ThreeDots className="h-6 w-16" />} /> : <Button content="Register" onClick={handleStoreTicket} /> }
            </div>
        </div>
    )
}

export default EmailSignUp;