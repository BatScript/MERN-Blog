var connection = require("../config/dataBase");
var Users = connection.models.User;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "UserID doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password, Try again!" });
        }

        const token = jwt.sign(
            { email: existingUser.emai, id: existingUser._id },
            "test",
            { expiresIn: '1h' }
        );

        console.log(token);

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong, pls try again" });
    }
};

const RegisterUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).result({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            likedPosts: req.body.likedPosts,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

        console.log(token);

        res.status(200).json({ result: result, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops something went wrong!" })
    }
};

module.exports = { RegisterUser, LoginUser };
