import {Server} from "./base";

const getAllSuperheroes = async (pageNumber) => await Server.get(`/superheroes`,{
    params: {
        pageNumber
    }
});

const getSuperheroById = async (id) => await Server.get(`/superheroes/${id}`);

const createSuperhero = async (superhero) => await Server.post('/superheroes', superhero)

const deleteSuperheroById = async (id) => await Server.delete(`/superheroes/${id}`)

const updateSuperhero = async (id, superhero) => await Server.put(`/superheroes/${id}`, superhero)

export {
    getAllSuperheroes,
    getSuperheroById,
    createSuperhero,
    deleteSuperheroById,
    updateSuperhero
}