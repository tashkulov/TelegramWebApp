import React from 'react';
import Button from "../Button/Button.jsx";
import {useTelegram} from "../../hooks/useTelegram.js";


const Header = () => {
    const {user,onClose}=useTelegram()
    return (
        <div className={'header'}>
            <Button onclick={onClose()}>Закрыть</Button>
            <span className={'username'}>
                {user.initDataUnsafe?.user?.username}
            </span>


        </div>
    );
};

export default Header;