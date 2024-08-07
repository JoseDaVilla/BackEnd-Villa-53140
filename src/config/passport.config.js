import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import { UsersManagerMongo as UsuariosManager } from "../dao/controllers/UserManagerDB.js";
import { createCartService } from "../services/cartsServiceDB.js";
import { generaHash, validatePassword } from "../utils.js";
<<<<<<< HEAD
import UserDTO from "../dao/DTOs/sessionsDTO.js";
=======
>>>>>>> c36ba2dff0a03159adf889f151fb220a6a55dc2e
import { config } from "./config.js";

const usuariosManager = new UsuariosManager();

export const initPassport = () => {
    passport.use(
        "github",
        new github.Strategy(
            {
                clientID: config.clientID,
                clientSecret: config.clientSecret,
<<<<<<< HEAD
                callbackURL: config.callbackURL,
=======
                callbackURL: config.callbackURL
>>>>>>> c36ba2dff0a03159adf889f151fb220a6a55dc2e
            },
            async (ta, tr, profile, done) => {
                try {
                    console.log(profile);
                    let email = profile._json.email;
                    let nombre = profile._json.name;
                    if (!email) {
                        return done(null, false);
                    }
                    let usuario = await usuariosManager.getBy({ email });
                    if (!usuario) {
                        usuario = await usuariosManager.create({
                            nombre, email, profile,
                        });
                        usuario = await usuariosManager.getBy({ email });
                        const carrito = await createCartService();
                        usuario.cart = carrito._id;
                        await usuariosManager.update({ email }, { cart: carrito._id });
                    }
                    return done(null, usuario);
                } catch (error) {
                    console.log("Error desde passport")
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "registro",
        new local.Strategy(
            {
                passReqToCallback: true,
                usernameField: "email"
            },
            async (req, username, password, done) => {
                try {
                    let { nombre, age } = req.body;
                    if (!nombre) {
                        return done(null, false);
                    }

                    let existe = await usuariosManager.getBy({ email: username });
                    if (existe) {
                        return done(null, false);
                    }

                    password = generaHash(password);

                    let usuario = await usuariosManager.create({ nombre, age, email: username, password });
                    const carrito = await createCartService();
                    usuario.cart = carrito._id;
                    await usuariosManager.update({ email: username }, { cart: carrito._id });

                    const userDTO = new UserDTO(usuario);

                    return done(null, userDTO);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done) => {
                try {
                    if (username == "adminCoder@coder.com" && password == "adminCod3r123") {
                        let usuario = {
                            _id: "idAdmin", nombre: "admin", email: username,
                            carrito: { _id: "6684bcfca12ca8e5db86e2ad" }, rol: "admin"
                        }

                        return done(null, usuario);
                    }

                    let usuario = await usuariosManager.getBy({ email: username });
                    if (!usuario) {
                        return done(null, false);
                    }

                    if (!validatePassword(password, usuario.password)) {
                        return done(null, false);
                    }

                    if (!usuario.cart) {
                        const carrito = await createCartService();
                        usuario.cart = carrito._id;
                        await usuariosManager.update({ email: username }, { cart: carrito._id });
                    }

                    const userDTO = new UserDTO(usuario);
                    console.log(usuario, userDTO);

                    return done(null, userDTO);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((userDTO, done) => {
        console.log("Serializing user:", userDTO);
        return done(null, userDTO._id); // Solo guardar el _id del usuario en la sesión
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            let usuario;
            if (id === "idAdmin") {
                usuario = {
                    _id: "idAdmin", nombre: "admin", email: "adminCoder@coder.com",
                    cart: { _id: "6684bcfca12ca8e5db86e2ad" }, rol: "admin"
                };
            } else {
                usuario = await usuariosManager.getBy({ _id: id });
            }
    
            console.log("Deserializing user:", usuario);
    
            if (!usuario) {
                return done(null, false); // Si no se encuentra el usuario
            }
    
            const userDTO = new UserDTO(usuario);
            console.log("Deserialized user DTO:", userDTO);
    
            return done(null, userDTO); // Retornar el objeto UserDTO
        } catch (error) {
            return done(error); // Manejar error si ocurre alguna excepción
        }
    });}
