import React from "react";
import './Error.scss'
import Button from "../button/button";

const Error= ({title, onButtonClick, buttonText}) => {
    const errorTitle = title==="" ? "Something went wrong! Try again" : title;
    return(
        <div className={'error__wrapper'}>
            <h3 className={'error__heading'}>{errorTitle}</h3>
            <Button onButtonClick={onButtonClick} className={'button button__lavender'}>{buttonText}</Button>
        </div>
    )
}

export default Error;