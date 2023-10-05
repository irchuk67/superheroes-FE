import {useDispatch, useSelector} from "react-redux";
import {createSuperhero} from "../../api/superheroes";
import {close as closeAddForm} from "../../redux/slices/addFormSlice"
import './CreateSuperhero.scss';
import SuperheroForm from "../SuperheroForm/SuperheroForm";
import {fetchAllSuperheroes} from "../../redux/slices/superheroesSlice";
import {useRef} from "react";

const CreateSuperhero = () => {
    const dispatch = useDispatch();
    const pageNumber = useSelector(state => state.superheroes.data.pageNumber);
    const handleSubmit = async (values) => {
        console.log(pageNumber)
        await createSuperhero(values);
        dispatch(fetchAllSuperheroes(pageNumber))
        dispatch(closeAddForm());
    }

    const initialValues = {
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: [],
        catch_phrase: "",
        images: []
    }


    return (
        <SuperheroForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            title={"Create Superhero"}
            buttonText={"Create"}
            onClose={closeAddForm}
        />)

}

export default CreateSuperhero;

