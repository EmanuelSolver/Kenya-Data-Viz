import { loginUser, registerUser} from '../controllers/authController.js';

const routes = (app) => {
    //auth routes
    app.route('/signUp')
        .post(registerUser);

    app.route('/login')
        .post(loginUser);
}

export default routes;