import { NextPage } from 'next';
import { Dispatch, SetStateAction } from 'react';

type DrawerType = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const Drawer:NextPage<DrawerType> = (props) => {
    return (
        <section>
            <article className={`fixed w-full h-screen top-0 left-0 right-0 ${props.show ? 'block' : 'hidden'}`} onClick={() => props.setShow(!props.show)} />
            <article className={`bg-gray-500 fixed w-full max-w-lg h-screen w-1.4 top-0 right-0 transition-transform ${props.show ? 'translate-x-0' : 'translate-x-full'}`}>
            
            </article>
        </section>
      
    )
}

export default Drawer;