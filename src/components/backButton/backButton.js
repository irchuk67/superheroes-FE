import {NavLink} from "react-router-dom";
import './backButton.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllSuperheroes} from "../../redux/slices/superheroesSlice";


const BackButton = (props) => {
    const pageNumber = useSelector(state => state.superheroes.data.pageNumber);
    const dispatch = useDispatch();

    return (
        <NavLink className={'back-button'} onClick={() => dispatch(fetchAllSuperheroes(pageNumber))} to={props.backPath}>
            <span>&larr;</span>Back
        </NavLink>
    )
}

export default BackButton;