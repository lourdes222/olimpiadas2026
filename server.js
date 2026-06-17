import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "argenvia"
});

conexion.connect((error) => {

    if (error) {

        console.log("Error MySQL:");
        console.log(error);
        return;

    }

    console.log("Conectado a MySQL");

});

/* ========================= */
/* INICIO */
/* ========================= */

app.get("/", (req, res) => {

    res.send("Servidor funcionando");

});

/* ========================= */
/* VIAJES */
/* ========================= */

app.get("/viajes", (req, res) => {

    conexion.query(
        "SELECT * FROM viajes",
        (error, resultados) => {

            if (error) {

                res.status(500).json(error);
                return;

            }

            res.json(resultados);

        }
    );

});

app.post("/viajes", (req, res) => {

    const {
        nombre,
        descripcion,
        precio,
        imagen
    } = req.body;

    conexion.query(
        `
        INSERT INTO viajes
        (nombre, descripcion, precio, imagen)
        VALUES (?, ?, ?, ?)
        `,
        [
            nombre,
            descripcion,
            precio,
            imagen
        ],
        (error, resultado) => {

            if (error) {

                res.status(500).json(error);
                return;

            }

            res.json({
                mensaje: "Viaje agregado",
                id: resultado.insertId
            });

        }
    );

});

app.delete("/viajes/:id", (req, res) => {

    conexion.query(
        "DELETE FROM viajes WHERE id = ?",
        [req.params.id],
        (error) => {

            if (error) {

                res.status(500).json(error);
                return;

            }

            res.json({
                mensaje: "Viaje eliminado"
            });

        }
    );

});

/* ========================= */
/* USUARIOS */
/* ========================= */

app.post("/registro", (req, res) => {

    const { usuario, email, password } = req.body;

    console.log("Intentando registrar:");
    console.log(usuario, email, password);

    conexion.query(
        `
        INSERT INTO usuarios
        (usuario, email, password)
        VALUES (?, ?, ?)
        `,
        [usuario, email, password],
        (error, resultado) => {

            if (error) {

                console.log("ERROR MYSQL:");
                console.log(error);

                res.status(500).json({
                    mensaje: error.message
                });

                return;
            }

            console.log(
                "Usuario guardado con ID:",
                resultado.insertId
            );

            res.json({
                mensaje: "Usuario registrado",
                id: resultado.insertId
            });

        }
    );

});

app.post("/login", (req, res) => {

    const {
        usuario,
        password
    } = req.body;

    conexion.query(
        `
        SELECT *
        FROM usuarios
        WHERE usuario = ?
        AND password = ?
        `,
        [
            usuario,
            password
        ],
        (error, resultados) => {

            if (error) {

                res.status(500).json(error);
                return;

            }

            if (resultados.length === 0) {

                res.status(401).json({
                    mensaje: "Usuario o contraseña incorrectos"
                });

                return;

            }

            res.json({
                mensaje: "Login correcto",
                usuario: resultados[0]
            });

        }
    );

});

/* ========================= */
/* SERVIDOR */
/* ========================= */

app.listen(3000, () => {

    console.log("Servidor en puerto 3000");

});