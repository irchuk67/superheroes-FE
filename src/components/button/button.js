import React, {ReactNode} from "react";
import './button.scss';

interface ButtonProps {
    onButtonClick?(event: React.MouseEvent<HTMLElement>):void,
    className?: string
    buttonType?: "button" | "submit" | "reset",
    children: ReactNode
}

const Button = (props: ButtonProps) => {
    return (
        <button onClick={props.onButtonClick} className={props.className} type={props.buttonType || 'button'}>
            {props.children}
        </button>
    )
}

const ButtonComponent = React.memo(Button);
export default ButtonComponent;