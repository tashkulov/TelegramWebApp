import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram.js";

const Form = () => {
    const [country,setCountry]=useState('')
    const [street,setStreet]=useState('')
    const [subject,setSubject]=useState('')
    const {tg}=useTelegram()

    const onSendData=useCallback(()=>{
        const data={
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data))
    },[country,street,subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked',onSendData())

        return()=>{
            tg.offEvent('mainButtonClicked',onSendData())

        }
    }, [onSendData()]);


    useEffect(()=>{
        tg.MainButton.setParams({
            text:'Отправить данные'
        })
    },[])
    useEffect(()=>{
        if(!street || !country){
            tg.MainButton.hide();

        }else{
            tg.MainButton.show();
        }

    },[country,street])

    const onChangeCountry=(e)=>{
        setCountry(e.target.value)
    }
    const onChangeStreet=(e)=>{
        setStreet(e.target.value)
    }

    const onChangeSubject=(e)=>{
        setSubject(e.target.value)
    }


    return (
        <div className={'form'}>
            <h3>Введите ваши данные </h3>
            <input className={'input'} type={'text'} value={country} onChange={onChangeCountry} placeholder={'Страна '}/>
            <input className={'input'} type={'text'}value={street} onChange={onChangeStreet} placeholder={'Улица'}/>

            <select value={subject} onChange={onChangeSubject}  className={'select'}>
                <option value={'physical'}>Физ.лицо</option>
                <option value={'legal'}>Юр.лицо</option>
            </select>


        </div>
    );
};

export default Form;


const TelegramBot = require('node-telegram-bot-api');

const token ='7162104102:AAE2uwb6upTqfRFMLbtFDMGk79rIYSGRUNc'
const webAppUrl='https://main--telegramwebsiteforme.netlify.app'

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {

    const chatIDd = msg.chat.id
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatIDd, 'Ниже появиться кнопка ,заполи форму :)', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполнить форму',web_app:{url:webAppUrl+'/form'}}]
                ]
            }
        })


        await bot.sendMessage(chatIDd, 'Заходи в наш интернет магазин по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Сделать заказ^^)',web_app:{url:webAppUrl}}]
                ]
            }
        })
    }


    if(msg?.web_app_data?.data){
        try {
            const data=JSON.parse(msg.web_app_data?.data)
            console.log(data)
            await  bot.sendMessage(chatIDd,'Спасибо за обратную связь')
            await bot.sendMessage(chatIDd,'Ваша страна:'+data?.country)
            await bot.sendMessage(chatIDd,'Ваша улица:'+data?.street)

            setTimeout(async ()=>{
                await bot.sendMessage('Всю информацию вы получите в этом чате ')
            },3000)
        }catch (e){
            console.log(e)
        }


    }

});