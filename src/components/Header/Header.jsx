import React from 'react';
import Button from "../Button/Button.jsx";


const Header = () => {
    const tg=Window.Telegram.WebApp

        const onClose=()=>{
            tg.close()
        }

    return (
        <div className={'header'}>
            <Button onclick={onClose()}>Закрыть</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>


        </div>
    );
};

export default Header;