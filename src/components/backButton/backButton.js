import {NavLink} from "react-router-dom";
import './backButton.scss';

type BackButtonProps = {
    backPath: string
}

const BackButton = (props: BackButtonProps) => {
    return (
        <NavLink className={'back-button'} to={props.backPath}>
            <span>&larr;</span>Back
        </NavLink>
    )
}

export default BackButton;