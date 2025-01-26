export default function ActorListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.actor.name} {props.actor.surname}</strong>
                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </div>
        </div>
    );
}