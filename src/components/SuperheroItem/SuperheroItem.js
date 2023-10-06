import {Fragment, useEffect} from "react";
import {fetchSuperheroById} from "../../redux/slices/superheroSlice";
import {useDispatch, useSelector} from "react-redux";
import edit from "../../assets/pencil.svg";
import deleteIcon from "../../assets/delete.svg";
import {fetchSuperpowers} from "../../redux/slices/superpowersSlice";
import Loading from "../Loading/Loading";
import Slider from "../Slider/Slider";
import BackButton from "../backButton/backButton";
import {open as openUpdateForm} from "../../redux/slices/updateFormSlice";
import UpdateSuperhero from "../UpdateSuperhero/UpdateSuperhero";
import {deleteSuperheroById} from "../../api/superheroes";
import {useNavigate} from "react-router-dom";
import {fetchAllSuperheroes} from "../../redux/slices/superheroesSlice";
import './SuperheroItem.scss';
import Error from "../Error/Error";

const SuperheroItem = (props) => {
    const path = window.location.pathname.split('/');
    const superheroId = path[1];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const superhero = useSelector(state => state.superhero);
    const {loading, data, error} = superhero;
    const {nickname, real_name, origin_description, superpowers, catch_phrase, images, _id} = data;
    const pageNumber = useSelector(state => state.superheroes.data.pageNumber);
    const superpowersList = useSelector(state => state.superpowers);
    const isUpdateOpen = useSelector(state => state.updateForm.isOpen);

    useEffect(() => {
        dispatch(fetchSuperheroById(superheroId));
        dispatch(fetchSuperpowers())
    }, []);

    const renderSuperpowers = () => {
        const superpowerItems = superpowersList?.data?.map(
            superpower => {
                if (superpowers.includes(superpower._id)) {
                    return (
                        <div className={`superhero__superpowers--superpower`}>
                            <p>{superpower.name}</p>
                        </div>
                    )
                }
            }
        )

        if (superpowerItems) {
            return superpowerItems;
        } else {
            return null;
        }
    }

    const onTryAgainClick = () => {
        dispatch(fetchSuperheroById(superheroId));
        dispatch(fetchSuperpowers())
    }
    const renderSuperhero = () => {
        return (
            <div className={'superhero'}>
                <Slider images={images}/>
                <div className={"superhero__info"}>
                    <div className={"superhero__info--header"}>
                        <h1 className={"superhero__nick"}>{nickname}</h1>

                        <div className={"superhero__info--buttons"}>
                            <img src={edit}
                                 alt={"edit"}
                                 onClick={
                                     () => dispatch(openUpdateForm())
                                 }/>
                            <img src={deleteIcon}
                                 alt={"delete"}
                                 onClick={
                                     async () => {
                                         await deleteSuperheroById(_id).then(
                                             res => {
                                                 dispatch(fetchAllSuperheroes())
                                                 navigate("/")
                                             }
                                         )
                                         ;

                                     }
                                 }
                            />
                        </div>
                    </div>
                    <div className={"superhero__field"}>
                        <p className={"superhero__field--name"}>Real name: </p>
                        <p className={"superhero__field--value"}>{real_name}</p>
                    </div>
                    <div className={"superhero__field"}>
                        <p className={"superhero__field--name"}>Description:</p>
                        <p className={"superhero__field--value"}>{origin_description}</p>
                    </div>
                    <div className={"superhero__field"}>
                        <p className={"superhero__field--name"}>Catch phrase:</p>
                        <p className={"superhero__field--value"}>{catch_phrase}</p>
                    </div>
                    <div className={"superhero__superpowers"}>
                        <p className={"superhero__field--name  superhero__superpowers--title"}>Superpowers:</p>
                        {superpowersList.loading && <Loading/>}
                        {(!superpowersList.loading && !superpowersList.error) && <div className={"superhero__superpowers--container"}>{renderSuperpowers()}</div>}
                        {(!superpowersList.loading && superpowersList.error) && <Error title={superpowersList.error} buttonText={"Try again"} onButtonClick={onTryAgainClick()}/>}
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div className={"superhero__wrapper"}>

            {
                !isUpdateOpen &&
                <Fragment>
                    <div>
                        <BackButton backPath={"/"}/>
                    </div>
                    {loading && <Loading/>}
                    {(!loading && !error) && renderSuperhero()}
                    {(!loading && error) && <Error title={error} buttonText={"Try again"} onButtonClick={onTryAgainClick}/>}
                </Fragment>
            }
            {
                isUpdateOpen && <UpdateSuperhero/>
            }
        </div>
    )
}

export default SuperheroItem