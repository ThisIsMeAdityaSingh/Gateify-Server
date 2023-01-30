const express = require('express');
const cors = require('cors');
const server = express();
const dotenv = require('dotenv');
const { supabaseClient } = require('./supabase/index');

const { userAuthRouter } = require('./router/auth/index');

dotenv.config();

server.use(cors());
server.use(express.json());
server.use('/auth/user', userAuthRouter);

const PORT = process.env.PORT || 4000;

const applicationServer = server.listen(PORT, () => console.log(`Server running on ${PORT}`));

if(!supabaseClient){
    applicationServer.close();
}

module.exports = { server, applicationServer };