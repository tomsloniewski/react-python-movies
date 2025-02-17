export default function MovieListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </div>
            {props.movie.description}
            {' '}
            <br/>
            Actors: {props.movie.actors.map(actor => actor.name + ' ' + actor.surname).join(', ')}
        </div>
    );
}
