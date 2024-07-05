
<<<<<<< HEAD
import UserDTO from "../dao/DTOs/sessionsDTO.js";

=======
>>>>>>> c36ba2dff0a03159adf889f151fb220a6a55dc2e
export const login = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Login exitoso!", usuario: req.user });
};

<<<<<<< HEAD

export const getCurrentUser = (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({userDTO});
};


export const githubLogin = (req, res) => {
    console.log("GitHub login service");
=======
export const getCurrentUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Datos de usuario--!!", usuario: req.user, carrito: req.user.cart });
};

export const githubLogin = (req, res) => {
    console.log("GitHub login service")
>>>>>>> c36ba2dff0a03159adf889f151fb220a6a55dc2e
};

export const githubCallback = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Login exitoso!", usuario: req.user });
};

export const handleError = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: "Error en la operación" });
};

export const register = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Registro exitoso!", usuario: req.user });
};

export const logout = (req, res) => {
    req.session.destroy(e => {
        if (e) {
            console.error("Error al destruir la sesión:", e);
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${e.message}`
            });
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/login');
};
