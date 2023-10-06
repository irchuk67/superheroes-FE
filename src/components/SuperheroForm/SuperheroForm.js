import {ErrorMessage, Field, Form, Formik} from "formik";
import Delete from "../../assets/delete.svg";
import Button from "../button/button";
import {useEffect, useRef, useState} from "react";
import {fetchSuperpowers} from "../../redux/slices/superpowersSlice";
import {useDispatch, useSelector} from "react-redux";
import {createSuperpower} from "../../api/superpowers";
import validationSchema from "./validate";
import './SuperheroForm.scss';

const SuperheroForm = ({initialValues, handleSubmit, title, buttonText, onClose}) => {
    const dispatch = useDispatch();
    const textAreaRef = useRef(null);
    const [textareaValue, setTextareaValue] = useState("");
    const superpowers = useSelector(state => state.superpowers);
    const [base64Images, setBase64Images] = useState(initialValues.images);
    const [addSuperpower, setAddSuperpower] = useState("");

    const handleUploadImage = (event, setFieldValue) => {
        const files = event.currentTarget.files;
        const base64 = [];
        Array.from(files).map(
            file => {
                if (!/\.(jpeg|jpg|png|gif)$/i.test(file.name)) return console.log("blah");
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    base64.push(reader.result);
                    if (base64.length === Array.from(files).length) {
                        setBase64Images([...base64Images, ...base64])
                        setFieldValue("images", [...base64Images, ...base64]);
                    }
                }
            })
    }

    const onDeleteImageClick = (currIndex, setFieldValue) => {
        const base64Clear = base64Images.filter(
            (image, index) => index !== currIndex
        );
        setBase64Images(base64Clear);
        setFieldValue("images", base64Clear)
    }

    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    useEffect(() => {
        dispatch(fetchSuperpowers());
    }, []);

    useEffect(resizeTextArea, [textareaValue]);

    const superpowersOptions = superpowers.data.map(
        superpower =>
            <div>
                <label>
                    <Field type={"checkbox"} name={"superpowers"} value={superpower._id}/>
                    <span>{superpower.name}</span>
                </label>
            </div>
    )

    const handleTextareaChange = (event, setFieldValue) => {
        setTextareaValue(event.target.value);
        setFieldValue("origin_description", event.target.value)
    }

    const onAddSuperpower = async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("press enter", addSuperpower)
            await createSuperpower({name: event.target.value});
            dispatch(fetchSuperpowers());
            setAddSuperpower("");
        }
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                render={
                    ({setFieldValue}) => {
                        return (
                            <Form className={'superhero-form'}>
                                <h1 className={'superhero-form__heading'}>{title}</h1>
                                <div className={'superhero-form__field'}>
                                    <label
                                        htmlFor={'nickname'}
                                        className={'superhero-form__field--label'}>
                                        Nickname
                                    </label>
                                    <Field
                                        type={'text'}
                                        name={'nickname'}
                                        id={'nickname'}
                                        className={'superhero-form__field--text'}
                                    />
                                    <ErrorMessage
                                        name={'nickname'}
                                        render={msg => <span className={'superhero-form__error'}>{msg}</span>}
                                    />
                                </div>
                                <div className={'superhero-form__field'}>
                                    <label
                                        htmlFor={'real_name'}
                                        className={'superhero-form__field--label'}>
                                        Real name
                                    </label>
                                    <Field
                                        type={'text'}
                                        name={'real_name'}
                                        id={'real_name'}
                                        className={'superhero-form__field--text'}
                                    />
                                    <ErrorMessage
                                        name={'real_name'}
                                        render={msg => <span className={'superhero-form__error'}>{msg}</span>}
                                    />
                                </div>
                                <div className={'superhero-form__field'}>
                                    <label
                                        htmlFor={'origin_description'}
                                        className={'superhero-form__field--label'}>
                                        Superhero description
                                    </label>
                                    <textarea
                                        ref={textAreaRef}
                                        name={'origin_description'}
                                        id={'origin_description'}
                                        className={'superhero-form__field--long-text'}
                                        onChange={(event) => handleTextareaChange(event, setFieldValue)}
                                    />
                                    <ErrorMessage
                                        name={'origin_description'}
                                        render={msg => <span className={'superhero-form__error'}>{msg}</span>}
                                    />
                                </div>
                                <div className={'superhero-form__superpowers'}>
                                    <div className={'superhero-form__superpowers--header'}>
                                       <div className={"superhero-form__label-with-error"}>
                                           <label htmlFor="checkbox-group"
                                                  className={'superhero-form__field--label'}>Superpowers</label>

                                           <ErrorMessage
                                               name={'superpowers'}
                                               render={msg => <span className={'superhero-form__error'}>{msg}</span>}
                                           />
                                       </div>

                                        <div className={'superhero-form__superpowers--add'}>
                                            <label>
                                                <input
                                                    type={"text"}
                                                    value={addSuperpower}
                                                    onChange={event => setAddSuperpower(event.target.value)}
                                                    onKeyDown={e => onAddSuperpower(e)}
                                                />

                                                <span>+</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div role="group" aria-labelledby="checkbox-group"
                                         className={"superhero-form__superpowers--checkbox"}>
                                        {superpowersOptions}
                                    </div>
                                </div>
                                <div className={'superhero-form__field'}>
                                    <label
                                        htmlFor={'catch_phrase'}
                                        className={'superhero-form__field--label'}>
                                        Catch phrase
                                    </label>
                                    <Field
                                        type={'text'}
                                        name={'catch_phrase'}
                                        id={'catch_phrase'}
                                        className={'superhero-form__field--text'}
                                    />
                                    <ErrorMessage
                                        name={'catch_phrase'}
                                        render={msg => <span className={'superhero-form__error'}>{msg}</span>}
                                    />
                                </div>

                                <div className={"superhero-form__add-image"}>
                                    <div className={"superhero-form__label-with-error"}>
                                        <label
                                            className={'superhero-form__field--label'}
                                        >
                                            Images
                                        </label>

                                        <ErrorMessage
                                            name={'images'}
                                            render={msg => <span className={'superhero-form__error'}>{msg}</span>}
                                        />
                                    </div>
                                    <div className={'superhero-form__add-image--button'}>
                                        <label>
                                            +Add image

                                            <input type={'file'}
                                                   name={'images'}
                                                   accept={".png, .jpg, .jpeg, .svg"}
                                                   onChange={(event) => handleUploadImage(event, setFieldValue)}
                                                   id={'images'}
                                                   multiple
                                            />
                                        </label>
                                        <p>up to 10 images</p>
                                    </div>

                                </div>
                                <div className="superhero-form__images">
                                    {
                                        base64Images &&
                                        base64Images.map(
                                            (image, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="superhero-form__images--image"
                                                    >
                                                        <img src={image} alt={'superhero image'}/>
                                                        <div className={"superhero-form__images--index"}>
                                                            <p>{index + 1}</p>
                                                        </div>
                                                        <div
                                                            className={"superhero-form__images--delete"}
                                                            onClick={() => onDeleteImageClick(index, setFieldValue)}
                                                        >
                                                            <img src={Delete} alt={"delete image"}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>

                                <div className={"superhero-form__buttons"}>
                                    <Button
                                        buttonType={'submit'}
                                        className={'button button__lavender'}
                                    >{buttonText}</Button>
                                    <Button
                                        onButtonClick={() => dispatch(onClose())}
                                        className={'button'}
                                    >Close</Button>
                                </div>

                            </Form>
                        )
                    }
                }
        >
        </Formik>

    )
}

export default SuperheroForm;