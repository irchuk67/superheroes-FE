import CreateSuperhero from "../CreateSuperhero/CreateSuperhero";
import {Fragment, useEffect} from "react";
import Button from "../button/button";
import {open as openAddForm} from "../../redux/slices/addFormSlice";
import Loading from "../Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import SuperheroList from "../SuperheroesList/SuperheroList";
import {fetchAllSuperheroes} from "../../redux/slices/superheroesSlice";
import './SuperheroesOverview.scss';
import Error from "../Error/Error";

const SuperheroesOverview = () => {
    const dispatch = useDispatch();
    const superheroes = useSelector(state => state.superheroes);
    const {loading, pagesAmount, pageNumber, error} = superheroes;
    const addForm = useSelector(state => state.addForm);

    useEffect(() => {
        dispatch(fetchAllSuperheroes(superheroes?.pageNumber))
    }, []);

    const handlePageChange = (pageNumber) => {
        dispatch(fetchAllSuperheroes(pageNumber))
    }
    const renderPages = () => {
        const pagesNumbers = [];
        for (let i = 0; i < pagesAmount;  i++){
            pagesNumbers.push(
                <div
                    className={`superhero-overview__page-numbers--number ${i === pageNumber && 'current-page'}`}
                    onClick={() => handlePageChange(i)}
                >
                    <p>{i+1}</p>
                </div>
            )
        }
        return pagesNumbers;
    }

    const onTryAgainClick = () => {
        dispatch(fetchAllSuperheroes())
    }

    return(
        <div className={"superhero-overview"}>
            {addForm.isOpen && <CreateSuperhero/>}
            {!addForm.isOpen &&
                <Fragment>
                    <h1 className={'heading'}>Superheroes</h1>
                    <Button className={'button button__lavender superhero-overview__button'}
                            onButtonClick={() => dispatch(openAddForm())}>
                        Add superhero
                    </Button>
                    {loading && <Loading speed={5}/>}
                    {(!loading && !error) &&
                        <div>
                            <SuperheroList/>
                            <div className={'superhero-overview__page-numbers'}>{renderPages()}</div>
                        </div>}
                    {(!loading && error) && <Error title={error} buttonText={"Try again"} onButtonClick={onTryAgainClick}/>}
                </Fragment>
            }

        </div>
    )
}

export default SuperheroesOverview;