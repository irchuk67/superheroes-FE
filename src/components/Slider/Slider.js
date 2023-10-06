import Button from "../button/button";
import {useRef} from "react";
import './Slider.scss';

const Slider = (props) => {
    const sliderRef = useRef(null);
    const scrollAmount = 500;
    const imagesView = props.images?.map(
        image => <img src={image}
                      alt={"superhero image"}
                      key={image.index}
                      className={'slider__container--image'}
        />
    )
    return (
        <div className={'slider'}>
            <Button
                className={'button button__lavender slider__button slider__button--left'}
                onButtonClick={
                    () => {
                        const container = sliderRef.current;
                        container.scrollLeft -= scrollAmount;
                    }}><p>previous</p></Button>
            <div className={"slider__container"} ref={sliderRef}>
                {imagesView}
            </div>
            <Button
                className={'button button__lavender slider__button slider__button--right'}
                onButtonClick={
                    () => {
                        const container = sliderRef.current;
                        container.scrollLeft += scrollAmount;
                    }}><p>next</p></Button>
        </div>
    )
}

export default Slider;