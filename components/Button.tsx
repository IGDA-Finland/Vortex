import React from 'react';

type ButtonType = {
    icon?: React.ReactNode;
    content?: string;
    className?: string;
    onClick?: () => void;
    pill?: boolean;
    transparent?: boolean;
}

export const Button = (props: ButtonType) => (
    <button className={`p-4 ${props.pill ? 'rounded-full' : 'rounded-lg'}  flex items-center justify-center hover:bg-gray-200 active:bg-gray-100 transition-all select-none ${props.className}`} onClick={props.onClick}>
        {props.icon ? props.icon : null}
        {props.content && <p className={`${props.icon && props.content ? 'ml-4' : 'ml-0'}`}>{props.content}</p>}
    </button>
);