from typing import List

from fastapi import FastAPI, HTTPException, Body
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import schemas
import models

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")

@app.get("/movies", response_model=List[schemas.Movie])
def get_movies():
    return list(models.Movie.select())

@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie =  models.Movie.get_by_id(movie_id)
    print(db_movie)
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie

@app.post("/movies", response_model=schemas.Movie)
def add_movie(movie: schemas.MovieBase):
    movie = models.Movie.create(**movie.model_dump())
    return movie

@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int):
    db_movie =  models.Movie.get_by_id(movie_id)
    return db_movie.delete_instance()

@app.get("/actors", response_model=List[schemas.Actor])
def get_actors():
    return list(models.Actor.select())

@app.get("/actors/{actor_id}", response_model=schemas.Actor)
def get_actor(actor_id: int):
    db_actor =  models.Actor.get_by_id(actor_id)
    if db_actor is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    return db_actor

@app.post("/actors", response_model=schemas.Actor)
def add_actor(actor: schemas.ActorBase):
    actor = models.Actor.create(**actor.model_dump())
    return actor

@app.delete("/actors/{actor_id}")
def delete_actor(actor_id: int):
    db_actor = models.Actor.get_by_id(actor_id)
    return db_actor.delete_instance()

@app.post("/movies/{movie_id}/actors", response_model=schemas.Movie)
def add_actor_to_movie(movie_id: int, actor_id: int = Body(...)):
    movie = models.Movie.get_by_id(movie_id)
    actor = models.Actor.get_by_id(actor_id)
    movie.actors.add(actor)
    return movie