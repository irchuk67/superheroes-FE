import {Server} from "./base";

const getAllSuperpowers = async () => await Server.get('/superpowers');

const createSuperpower = async (superpower) => await Server.post('/superpowers', superpower);

const deleteSuperpowerById = async (id) => await Server.delete(`/superpowers/${id}`)
export {
    getAllSuperpowers,
    createSuperpower,
    deleteSuperpowerById
}