import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import { promisePool } from '../config/db.js'; 

//enables restriction of routes to authenticated users only
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}

// Signup a new user
export const registerUser = async (req, res) => {
    const { username, confirmPassword, email } = req.body;
    const hashedPassword = bcrypt.hashSync(confirmPassword, 10);

    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM users WHERE UserName = ? OR Email = ?',
            [username, email]
        );
        
        const user = rows[0];
        if (user) {
            res.status(401).json({ error: 'User already exists' });
        } else {
            await promisePool.query(
                'INSERT INTO users (UserName, Email, Password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );
            res.status(201).json({ message: 'User created successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// login existing user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM users WHERE UserName = ?',
            [username]
        );

        const user = rows[0];

        if (!user) {
            res.status(401).json({ error: "User Doesn't Exist" });
        } else if (!bcrypt.compareSync(password, user.Password)) {
            res.status(401).json({ error: 'Wrong Credentials' });
        } else {
            const token = `JWT ${jwt.sign({ email: user.Email, username: user.UserName, id: user.Id }, process.env.JWT_SECRET)}`;
            return res.json({ id: user.Id, username: user.UserName, email: user.Email, token: token });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
