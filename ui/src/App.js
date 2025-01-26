import './App.css';
import {useEffect, useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from "./ActorForm";
import ActorsList from "./ActorsList";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [actors, setActors] = useState([]);
    const [addingActor, setAddingActor] = useState(false);

    async function handleAddMovie(movie) {

        const response = await fetch('/movies', 
            {
                method: 'POST',
                body: JSON.stringify(movie),
                headers: { 'Content-Type': 'application/json' }
            }
        );
        if(response.ok) {
            const movieFromServer = await response.json();
            setMovies([...movies, movieFromServer]);
            setAddingMovie(false);
        }
    }

    async function handleDeleteMovie(movie) {

        const response = await fetch(`/movies/${movie.id}`,
            {
                method: 'DELETE'
            }
        );
        if(response.ok) {
            setMovies(movies.filter(m => m.id !== movie.id));
        }
    }

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/movies');
            if(response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();
    }, []);


    async function handleAddActor(actor) {

        const response = await fetch('/actors',
            {
                method: 'POST',
                body: JSON.stringify(actor),
                headers: { 'Content-Type': 'application/json' }
            }
        );
        if(response.ok) {
            const actorFromServer = await response.json();
            setActors([...actors, actorFromServer]);
            setAddingActor(false);
        }
    }

    async function handleDeleteActor(actor) {

        const response = await fetch(`/actors/${actor.id}`,
            {
                method: 'DELETE'
            }
        );
        if(response.ok) {
            setActors(actors.filter(a => a.id !== actor.id));
        }
    }

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch('/actors');
            if(response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
        };
        fetchActors();
    }, []);


    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              handleDeleteMovie={handleDeleteMovie}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
            <br/>
            {actors.length === 0
                ? <p>No actors yet. Maybe add something?</p>
                : <ActorsList actors={actors}
                              handleDeleteActor={handleDeleteActor}
                />}
            {addingActor
                ? <ActorForm onActorSubmit={handleAddActor}
                             buttonLabel="Add an actor"
                />
                : <button onClick={() => setAddingActor(true)}>Add an actor</button>}
        </div>
    );
}

export default App;
