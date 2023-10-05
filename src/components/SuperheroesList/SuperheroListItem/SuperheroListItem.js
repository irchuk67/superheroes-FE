import account from '../../assets/account.svg';
const SuperheroListItem = (props) => {
    return(
        <div>
            <img src={account} alt={'superhero'}/>
            <h3>{props.nickname}</h3>
        </div>
    )
}

export default SuperheroListItem;