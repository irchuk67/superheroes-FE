import {useDispatch, useSelector} from "react-redux";
import {createSuperhero, updateSuperhero} from "../../api/superheroes";
import {close as closeUpdateForm} from "../../redux/slices/updateFormSlice"
import SuperheroForm from "../SuperheroForm/SuperheroForm";
import {fetchAllSuperheroes} from "../../redux/slices/superheroesSlice";
import {fetchSuperheroById} from "../../redux/slices/superheroSlice";

const UpdateSuperhero = () => {
    const dispatch = useDispatch();
    const pageNumber = useSelector(state => state.superheroes.data.pageNumber);
    const superhero = useSelector(state => state.superhero.data);
    const handleSubmit = async (values) => {
        console.log(values)
        await updateSuperhero(superhero._id, values);
        dispatch(fetchSuperheroById(superhero._id))
        dispatch(fetchAllSuperheroes(pageNumber))
        dispatch(closeUpdateForm());
    }

    console.log(superhero.images)
    const initialValues = {
        nickname: superhero.nickname,
        real_name: superhero.real_name,
        origin_description: superhero.origin_description,
        superpowers: superhero.superpowers,
        catch_phrase: superhero.catch_phrase,
        images: superhero.images
    }


    return (
        <SuperheroForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            title={"Update Superhero"}
            buttonText={"Update"}
            onClose={closeUpdateForm}
        />)

}

export default UpdateSuperhero;

