const knex = require("../database/knex");

class MoviesController {
    async create(request, response){
        const { title, description, tags, rating } = request.body;
        const { user_id } = request.params;
        
        const note_id =  await knex("movie_movies").insert({
            title,
            description,
            rating,
            user_id,

        })



        const tagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        })

        await knex("movie_tags").insert(tagsInsert)
        
       return (response.json());
    }


    async show(request, response) {
        const { id } = request.params;

        const note = await knex("movie_movies").where({ id }).first();
        const tags = await knex("movie_tags").where({ note_id: id}).orderBy("name");
        
        return response.json({...note, tags})

    }

    async delete(request, response){
        const { id } = request.params;

        await knex("movie_movies").where({ id }).delete();

        return response.json();
    }

    async index(request, response){
        const {user_id, title, tags } = request.query;

        let movies;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());

            movies = await knex("movie_tags")
            
            .select(
                [
                    "movie_movies.id",
                    "movie_movies.title",
                    "movie_movies.user_id"
                ]
            )
            .where("movie_movies.user_id", user_id)
            .whereLike("movie_movies.title", `%${title}%`)    
            .whereIn("name", filterTags)
            .innerJoin("movie_movies", "movie_movies.id", "movie_tags.note_id")
            .orderBy("movie_movies.title")
        
        }else{
            movies = await knex("movie_movies")
            .where({user_id})
            .whereLike("title", `%${title}%`)
            .orderBy("title")
        }

        const userTags = await knex("movie_tags").where({ user_id })
        const moviesWithTags = movies.map(note => {
            const noteTags  =userTags.filter(tag => tag.note_id === note.id )

            return {
                ...note,
                tags: noteTags
            }
        })

        return response.json({ moviesWithTags })
    }

}


    module.exports = MoviesController;