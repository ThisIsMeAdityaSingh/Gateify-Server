/**
 * Middleware to validate the payload before passing it on to controller.
 * @param {function} validationFunction - function which will validate payload
 * @param {object} parentObject - parent object of which function is a method off
 * @return {Function} 
 */
function validateRequest(validationFunction, fields, parentObject){
    const validatePayload = validationFunction.bind(parentObject);

    return function(req, res, next){
        const {status, message} = validatePayload(req.body, fields);

        if(!status){
            res.status(400);
            res.json({status, message});
            return;
        }

        next();
    }
}

module.exports = { validateRequest };