import {useState} from "react";

export default function ActorInMovieForm(props) {
    const [actorId, setActorId] = useState('');
    const [movieId, setMovieId] = useState('');

    function addActorToMovie(event) {
        event.preventDefault();
        props.onActorToMovieSubmit(actorId, movieId);
        setActorId('');
        setMovieId('');
    }

    return <form onSubmit={addActorToMovie}>
        <h2>Add actor to movie</h2>
        <div>
            <label>Actor Id</label>
            <input type="number" value={actorId} onChange={(event) => setActorId(event.target.value)}/>
        </div>
        <div>
            <label>Movie Id</label>
            <input type="number" value={movieId} onChange={(event) => setMovieId(event.target.value)}/>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
