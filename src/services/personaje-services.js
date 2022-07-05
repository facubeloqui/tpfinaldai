import config from "../../dbconfig";
import sql from 'mssql'
import Personaje from "../models/personaje";

class PersonajeService {
    getAll = async () => {
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .query('SELECT * FROM Personajes');
            return result.recordsets
        } catch (error) {
            console.log(error);
        }
    }
    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PersonajeService.GetById(id)')
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM Personajes WHERE id = @pId');
            returnEntity = result.recordsets[0][0];                    
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    insert = async (personaje) => {
        try {
            console.log(personaje);
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                    .input("Imagen", sql.VarChar, personaje.Imagen)
                                    .input("Nombre", sql.VarChar, personaje.Nombre)
                                    .input("Edad", sql.Date, personaje.Edad)
                                    .input("Peso", sql.Int, personaje.Peso)
                                    .input("Historia", sql.VarChar, personaje.Personaje)
                                    .input("personaje", sql.Int, personaje.personaje)
                                    .query("INSERT INTO personaje (Imagen, Nombre, Edad, Peso, Historia, personaje) VALUES (@Imagen, @Nombre, @Edad, @Peso, @Historia, @personaje))");
    return result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
    }
    update = async (personaje,id) => {
        let rowsAffected = 0;
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
            .input("Imagen", sql.VarChar, personaje.Imagen)
            .input("Titulo", sql.VarChar, personaje.Titulo)
            .input("FechaDeCreacion", sql.Date, personaje.FechaDeCreacion)
            .input("Calificacion", sql.Int, personaje.Calificacion)
            .input("Personaje", sql.VarChar, personaje.Personaje)
            .query("INSERT INTO Personaje (Imagen, Titulo, FechaDeCreacion, Calificacion, Personaje) VALUES (@Imagen, @Titulo, @FechaDeCreacion, @Calificacion, @Personaje))");
                rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected
    }
    deleteById = async (id) => {
        let retunrEntity = 0;
        console.log('Estoy en: personajeService.deleteById(id)')
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
                            .input('Id', sql.Int, id)
                            .query('DELETE FROM personajes WHERE id = @Id');
        retunrEntity = result.recordsets;              
        console.log(result);      
    } catch (error) {
        console.log(error);
    }
    return retunrEntity;
    }
}
export default PersonajeService;