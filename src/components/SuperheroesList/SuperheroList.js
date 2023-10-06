import {getAllSuperheroes} from "../../api/superheroes";
import SuperheroListItem from "./SuperheroListItem/SuperheroListItem";
import {useNavigate} from "react-router-dom";
import loading from "../Loading/Loading";
import Loading from "../Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllSuperheroes} from "../../redux/slices/superheroesSlice";
import './SuperheroList.scss';
import Button from "../button/button";
import CreateSuperhero from "../CreateSuperhero/CreateSuperhero";
import {open as openAddForm} from "../../redux/slices/addFormSlice";

const SuperheroList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const superheroes = useSelector(state => state.superheroes.data);

    const onItemClick = (id) => {
        console.log(id)
        navigate(`/${id}`)
    }

    const superheroList = superheroes?.map(
        superhero => <SuperheroListItem nickname={superhero.nickname}
                                        image={superhero.images[0]}
                                        key={superhero._id}
                                        onClick={() => onItemClick(superhero._id)}
        />
    )
    return(
        <div className={'superhero-list'}>{superheroList}</div>
    )
}

export default SuperheroList;