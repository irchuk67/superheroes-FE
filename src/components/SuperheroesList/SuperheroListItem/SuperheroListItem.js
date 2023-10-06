import imageStandard from '../../../assets/image.svg';
const SuperheroListItem = ({image, onClick, nickname}) => {
    return(
        <div className={'superhero-list__item'} onClick={onClick}>
            <img src={image ? image : imageStandard} alt={'superhero'} className={'superhero-list__item--image'}/>
            <h3 className={'superhero-list__item--nick'}>{nickname}</h3>
        </div>
    )
}

export default SuperheroListItem;