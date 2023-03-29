import { NextPage } from 'next';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { QRCodeSVG } from 'qrcode.react';

import useHover from '../hooks/useHover'

import * as types from '../types';

const CONSTRAINT = { x: 10, y: 5 };
const CONSTRAINT_MOBILE = { x: 15, y: 25 };

type ItemType = {
    coordinates: {
        x: number;
        y: number;
    };
    constraint: {
        x: number;
        y: number;
    };
}

type CardPageType = {
    ticket: types.TicketType;
}

const Container = styled.article`
    transform: translate3d(0, 0, 0.1px);
    will-change: transform, visibility;
    transform-style: preserve-3d;
    perspective: 600px;
    transform-origin: center;
`;

const ContainerThumbnail = styled.article`
    width: 256px;
    height: 420px;
`;

const CardContent = styled.div`
    width: 420px;

    @media(max-width: 425px) {
        width: auto;
    }
`;

const CardContentThumbnail = styled.div`
    height: 100%;
`;

const Item = styled.article<ItemType>`
    transform: rotateY(${props => (props.coordinates.x) / props.constraint.x}deg)  rotateX(${props => (props.coordinates.y) / props.constraint.y}deg);
    transform-style: preserve-3d;
    transform-origin: center;
    will-change: transform;
    transition-property: all;
    transition-timing-function: ease;
    transition-duration: 350ms;

    width: 600px;
    height: 300px;

    @media(max-width: 425px) {
        width: 320px;
        height: 600px;
    }
`;

export const Card:NextPage<CardPageType> = (props) => {
    const [hoverRef, hoverValue] = useHover<HTMLElement>();

    return (
        <Container ref={hoverRef}>
            <Item className="relative" coordinates={{x: hoverValue.x, y: hoverValue.y}} constraint={CONSTRAINT}>
                <div className="absolute w-full h-full">
                    <svg width="100%" height="100%" viewBox="0 0 650 330" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.95431 0 0 8.95431 0 20V138C14.9117 138 27 150.088 27 165C27 179.912 14.9117 192 0 192V310C0 321.046 8.9543 330 20 330H630C641.046 330 650 321.046 650 310V192C635.088 192 623 179.912 623 165C623 150.088 635.088 138 650 138V20C650 8.95431 641.046 0 630 0H20Z" fill="#252729"></path><path fillRule="evenodd" clipRule="evenodd" d="M21 5C12.1634 5 5 12.1634 5 21V133.388C20.2981 135.789 32 149.028 32 165C32 180.972 20.2981 194.211 5 196.612V309C5 317.837 12.1634 325 21 325H629C637.837 325 645 317.837 645 309V196.612C629.702 194.211 618 180.972 618 165C618 149.028 629.702 135.789 645 133.388V21C645 12.1634 637.837 5 629 5H21Z" fill="black"></path><path d="M512 5V326" stroke="#444444" strokeDasharray="6 6"></path></svg>
                </div>

                <div className="relative grid grid-cols-2 px-12 py-6 w-full h-full">
                    <CardContent className="flex flex-col justify-between">
                        <div className="grid grid-cols-8 gap-2 items-center">
                            <div className="h-24 w-24 bg-gray-300 rounded-full col-span-2">
                                <img src={props.ticket.users.avatar} alt="ticket avatar" className="h-24 w-24 rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center col-span-6">
                                <h3 className="text-3xl font-bold text-white">{props.ticket.users.name}</h3>
                                <p className="text-gray-500 mt-1">{props.ticket.users.username}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col justify-end">
                                <div className="grid grid-cols-6 gap-1 items-center">
                                    <div className="h-16 w-16 lg:h-14 lg:w-14 bg-gray-300 rounded-full col-span-2"></div>
                                    <div className="flex flex-col justify-center col-span-4">
                                        <h4 className="font-bold uppercase text-xl">{props.ticket.events.title}</h4>
                                    </div>
                                </div>
                                <div className="flex flex-col uppercase text-xl mt-4 lg:mt-3 leading-6">
                                    <p>{dayjs(props.ticket.events.start_at).format('DD MMMM YYYY')}</p>
                                    <p>{props.ticket.events.locationType}</p>
                                </div>
                            </div>

                            <div className="bg-gray-300 h-36 w-36">
                                <QRCodeSVG value={props.ticket.ticketId.toString()} className="w-full h-full"/>
                            </div>
                        </div>
                    </CardContent>
                    <div className="flex justify-center mt-2 font-extrabold text-white rotate-90 text-4xl lg:text-3xl">
                        <p className="mr-2">№</p>
                        <p>{props.ticket.ticketId}</p>
                    </div>
                </div>
            </Item>
        </Container>
    )
}

export const MobileCard:NextPage<CardPageType> = (props) => {
    const [hoverRef, hoverValue] = useHover<HTMLElement>();

    return (
        <Container ref={hoverRef}>
            <Item className="relative" coordinates={{x: hoverValue.x, y: hoverValue.y}} constraint={CONSTRAINT_MOBILE}>
                <div className="absolute w-full h-full">
                    <svg width="100%" height="100%" viewBox="0 0 330 560" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.9193e-06 540C3.40212e-06 551.046 8.95431 560 20 560L138 560C138 545.088 150.088 533 165 533C179.912 533 192 545.088 192 560L310 560C321.046 560 330 551.046 330 540L330 20C330 8.95427 321.046 -1.40334e-05 310 -1.35505e-05L192 -8.39259e-06C192 14.9117 179.912 27 165 27C150.088 27 138 14.9117 138 -6.03217e-06L20 -8.74228e-07C8.95428 -3.91405e-07 -2.41646e-05 8.95428 -2.36041e-05 20L2.9193e-06 540Z" fill="#252729"></path><path fillRule="evenodd" clipRule="evenodd" d="M5 539C5 547.837 12.1634 555 21 555L133.388 555C135.789 539.702 149.028 528 165 528C180.972 528 194.211 539.702 196.612 555L309 555C317.837 555 325 547.837 325 539L325 21C325 12.1634 317.837 4.99999 309 4.99999L196.612 4.99999C194.211 20.2981 180.972 32 165 32C149.028 32 135.789 20.2982 133.388 4.99999L21 5C12.1634 5 4.99998 12.1635 4.99998 21L5 539Z" fill="black"></path><path d="M326 446H5" stroke="#444444" strokeDasharray="6 6"></path></svg>
                </div>

                <div className="relative px-6 py-16 flex flex-col w-full h-full">
                    <CardContent className="flex flex-col h-full justify-between items-center ">
                        <div className="grid grid-cols-6 gap-1 items-center">
                            <div className="h-20 w-20 bg-gray-300 rounded-full col-span-2">
                                <img src={props.ticket.users.avatar} alt="ticket avatar" className="h-full w-full rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center col-span-4">
                                <h3 className="text-2xl font-bold text-white">{props.ticket.users.name}</h3>
                                <p className="text-gray-500">{props.ticket.users.username}</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full items-center pb-12">
                            <div className="flex flex-col w-full">
                                <div className="grid grid-cols-8 gap-1 items-center">
                                    <div className="h-12 w-12 bg-gray-300 rounded-full col-span-2"></div>
                                    <div className="flex flex-col col-span-6">
                                        <h4 className="font-bold uppercase text-xl">{props.ticket.events.title}</h4>
                                    </div>
                                </div>
                                <div className="flex flex-col uppercase text-xl leading-6 mt-4">
                                    <p>{dayjs(props.ticket.events.start_at).format('DD MMMM YYYY')}</p>
                                    <p>{props.ticket.events.locationType}</p>
                                </div>
                            </div>
                            <div className="bg-gray-300 h-36 w-36">
                                <QRCodeSVG value={props.ticket.ticketId.toString()} className="w-full h-full"/>
                            </div>
                        </div>
                       
                    </CardContent>
                    <div className="flex font-extrabold text-white justify-center w-full text-3xl mb-4">
                        <p className="mr-2">№</p>
                        <p>{props.ticket.ticketId}</p>
                    </div>
                </div>
               
            </Item>
        </Container>
    )
}

export const CardThumbnail:NextPage<CardPageType> = (props) => {
    return (
        <ContainerThumbnail className="relative m-auto">
            <div className="absolute w-full">
                <svg width="100%" height="100%" viewBox="0 0 330 560" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.9193e-06 540C3.40212e-06 551.046 8.95431 560 20 560L138 560C138 545.088 150.088 533 165 533C179.912 533 192 545.088 192 560L310 560C321.046 560 330 551.046 330 540L330 20C330 8.95427 321.046 -1.40334e-05 310 -1.35505e-05L192 -8.39259e-06C192 14.9117 179.912 27 165 27C150.088 27 138 14.9117 138 -6.03217e-06L20 -8.74228e-07C8.95428 -3.91405e-07 -2.41646e-05 8.95428 -2.36041e-05 20L2.9193e-06 540Z" fill="#252729"></path><path fillRule="evenodd" clipRule="evenodd" d="M5 539C5 547.837 12.1634 555 21 555L133.388 555C135.789 539.702 149.028 528 165 528C180.972 528 194.211 539.702 196.612 555L309 555C317.837 555 325 547.837 325 539L325 21C325 12.1634 317.837 4.99999 309 4.99999L196.612 4.99999C194.211 20.2981 180.972 32 165 32C149.028 32 135.789 20.2982 133.388 4.99999L21 5C12.1634 5 4.99998 12.1635 4.99998 21L5 539Z" fill="black"></path><path d="M326 446H5" stroke="#444444" strokeDasharray="6 6"></path></svg>
            </div>
            
            <CardContentThumbnail className="relative flex flex-col justify-center">
                <div className="relative flex flex-col justify-between h-full">
                    <div className="flex flex-col h-full justify-center items-center ">
                        <div className="flex flex-col w-full items-center">
                            <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
                            <h3 className="text-xl font-bold text-white mt-2">Your Name</h3>
                            <p className="text-base font-bold text-gray-400 mt-2">{props.ticket.events.title}</p>
                        </div>
                    </div>
                    <div className="flex font-extrabold text-white justify-center w-full text-lg pb-6">
                        <p className="mr-2">№</p>
                        <p>{props.ticket.ticketId}</p>
                    </div>
                </div>
            </CardContentThumbnail> 
        </ContainerThumbnail>
    )
}