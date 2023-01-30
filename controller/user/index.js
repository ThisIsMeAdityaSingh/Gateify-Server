const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const { supabaseClient } = require('../../supabase/index');

/**
 * Creates a user.
 * Method POST
 */
async function createUser(req, res){
    const { username, email, password } = req.body;

    try {
        // checking if user with that email ID already exists or not
        const { data, error } = await supabaseClient.from('User').select().eq('email', email);
        if(data?.statusText === "OK"){
            res.status(400);
            res.json({
                message: `User with email ${email} already exist. Please try signing in.`
            });
            return;
        }

        //register new user
        // encrypting password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //insert user
        const response = await supabaseClient.from('User').insert({
            user_id: uuid(),
            name: username,
            email: email,
            password: hashedPassword
        }).select();

        if(response?.error){
            res.status(400);
            res.json({
                message: response.error?.details || 'Error encountered while registering user. Please try again later.'
            });
            return;
        }

        if(response?.data){
            res.status(201);
            res.json(response.data);
            return;
        }

        res.status(404);
        res.json({
            message: 'Endpoint not found. Try contacting customer care'
        });

        return;

    } catch (error) {
        res.status(500);
        res.json({
            message: error.message || 'Server error. Please try again later'
        })
        return;
    }
}

/**
 * Authenticates user.
 * Method POST
 */
async function authenticateUser(req, res){
    const { email, password } = req.body;

    try {
        // try fetching the user with the email ID provided.
        const { data, error } = await supabaseClient.from('User').select().eq('email', email);
        if(error){
            res.send(404);
            res.json({
                message: `No user with email ${email} found. Please Sign up and then login.`,
            });
            return;
        }

        const userPassword = data?.[0]?.password || '';

        if(!userPassword){
            res.send(403);
            res.json({
                message: 'There is a problem with your account set up. Please contact customer support'
            });
            return;
        }

        // checking the password from the request body with password from db.
        const validatePassword = await bcrypt.compare(password, userPassword);

        if(!validatePassword){
            res.send(403);
            res.json({
                message: 'Incorrect password. Please try again'
            });
            return;
        }

        if(validatePassword){
            res.send(200);
            delete data.password;
            res.json(data);
        }

        res.status(404);
        res.json({
            message: 'Endpoint not found. Try contacting customer care'
        });

        return;

    } catch (error) {
        res.status(500);
        res.json({
            message: error.message || 'Server error. Please try again later'
        })
        return;
    }
}

module.exports = { createUser, authenticateUser };