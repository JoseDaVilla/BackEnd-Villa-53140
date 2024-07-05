import { Router } from "express";
import passport from "passport";
import { auth } from "../middleware/auth.js";
<<<<<<< HEAD
import { login, getCurrentUser, githubLogin, githubCallback, handleError, register, logout, } from "../services/sessionsService.js";

const router = Router();

router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/error" }),
    login
);

router.get("/current", auth([ 'admin','user']), getCurrentUser);


router.get("/github", passport.authenticate("github", { failureRedirect: "/api/sessions/error" }),
    githubLogin
);

router.get("/callbackGithub", passport.authenticate("github", { failureRedirect: "/api/sessions/error" }),
    githubCallback
);

router.get("/error", handleError);

router.post("/registro", passport.authenticate("registro", { failureRedirect: "/api/sessions/error" }),
    register
);

=======
import { login, getCurrentUser, githubLogin, githubCallback, handleError, register, logout,} from "../services/sessionsService.js";

const router = Router();


router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/error" }),
  login
);

router.get("/current", auth, getCurrentUser);

router.get("/github", passport.authenticate("github", { failureRedirect: "/api/sessions/error" }),
  githubLogin
);

router.get("/callbackGithub", passport.authenticate("github", { failureRedirect: "/api/sessions/error" }),
  githubCallback
);

router.get("/error", handleError);

router.post("/registro", passport.authenticate("registro", { failureRedirect: "/api/sessions/error" }),
  register
);

>>>>>>> c36ba2dff0a03159adf889f151fb220a6a55dc2e
router.get("/logout", logout);

export default router;