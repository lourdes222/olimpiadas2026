import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", 
    database: "olimpiadas2026" 
});

conexion.connect((error) => {
    if (error) {
        console.log("Error MySQL:");
        console.log(error);
        return;
    }
    console.log("Conectado a MySQL");
});

/* INICIO */
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

/* VIAJES */
app.get("/viajes", (req, res) => {
    conexion.query(
        "SELECT * FROM viajes",
        (error, resultados) => {
            if (error) {
                console.log("Error al obtener viajes:", error);
                res.status(500).json({ mensaje: "Error al obtener los viajes" });
                return;
            }
            res.json(resultados);
        }
    );
});

app.post("/viajes", (req, res) => {
    const { nombre, descripcion, precio, imagen } = req.body;

    conexion.query(
        `
        INSERT INTO viajes (nombre, descripcion, precio, imagen)
        VALUES (?, ?, ?, ?)
        `,
        [nombre, descripcion, precio, imagen],
        (error, resultado) => {
            if (error) {
                console.log("Error al insertar viaje:", error);
                res.status(500).json({ mensaje: "Error al guardar el viaje" });
                return;
            }

            res.json({
                mensaje: "Viaje agregado con éxito",
                id: resultado.insertId
            });
        }
    );
});

app.delete("/viajes/:id", (req, res) => {
    const idViaje = req.params.id;

    conexion.query(
        "DELETE FROM viajes WHERE id = ?",
        [idViaje],
        (error) => {
            if (error) {
                console.log("Error al eliminar viaje:", error);
                res.status(500).json({ mensaje: "Error al eliminar el viaje" });
                return;
            }

            res.json({
                mensaje: "Viaje eliminado con éxito"
            });
        }
    );
});

/* USUARIOS */


app.post("/registro", (req, res) => {
    
    const { usuario, email, password } = req.body;

    console.log("Intentando registrar al usuario:", usuario);

    conexion.query(
        `
        INSERT INTO usuarios (usuario, email, password, rol)
        VALUES (?, ?, ?, 'usuario')
        `,
        [usuario, email, password],
        (error, resultado) => {
            if (error) {
                console.log("ERROR MYSQL:");
                console.log(error);
                res.status(500).json({ mensaje: "El usuario ya existe o hubo un error." });
                return;
            }

            res.json({
                mensaje: "Usuario registrado con éxito",
                id: resultado.insertId
            });
        }
    );
});

app.post("/login", (req, res) => {
    
    const { usuario, password } = req.body;

    conexion.query(
        `
        SELECT id, usuario, rol 
        FROM usuarios
        WHERE usuario = ?
        AND password = ?
        `,
        [usuario, password],
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

            const usuarioLogueado = resultados[0];
            
            res.json({
                mensaje: "Login correcto",
                usuario: {
                    id: usuarioLogueado.id,
                    usuario: usuarioLogueado.usuario,
                    rol: usuarioLogueado.rol
                }
            });
        }
    );
});

/* SERVIDOR */
app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});