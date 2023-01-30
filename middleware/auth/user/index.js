const { isEmptyObject, capitalizeFirstLetter } = require('../../../common/utils');

const USER_MIDDLEWARE = {
    dataMap: {
        email: {
            type: 'string', 
            minLength: 8,
            maxLength: 250, 
            regex: [
                {
                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                    message: 'Invalid Email Provided'
                }
            ]
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 256,
            regex: [
                {
                  pattern: /[A-Z]/,
                  message: 'Should contain at least one capital letter'
                },
                {
                  pattern: /[a-z]/,
                  message: 'Should contain at least one small letter'
                },
                {
                  pattern: /\d/,
                  message: 'Should contain at least one number'
                },
                {
                  pattern: /[!@#\$%^&*(),.?":{}|<>]/,
                  message: 'Should contain at least one special character'
                }
            ]
        },
        username: {
            type: 'string',
            minLength: 3,
            maxLength: 24,
            regex: [
                {
                    pattern: /^[a-zA-Z0-9._]+$/,
                    message: 'Name should only contain, small or capital letter, number or underscores'
                }
            ]
        }
    },
    validatePayload: function (payload, fields = Object.keys(this.dataMap)) {
        if(!payload) return {status: false, message: 'No payload object provided'};

        if(typeof payload !== 'object') return {status: false, message: 'Payload should be of type object'};

        if(isEmptyObject(payload)) return {status: false, message: 'Empty payload object provided'};

        for(const field of fields){
            if(!Object.hasOwn(payload, field)){
                return {status: false, message: `${capitalizeFirstLetter(field)} is not present in payload`};
            }

            if(typeof payload[field] !== this.dataMap[field].type) return {status: false, message: `${capitalizeFirstLetter(field)} should be of type ${this.dataMap[field].type}`};

            if(payload[field].length < this.dataMap[field].minLength || payload[field].length > this.dataMap[field].maxLength){
                return {status: false, message: `${capitalizeFirstLetter(field)} should be between ${this.dataMap[field].minLength} to ${this.dataMap[field].maxLength} long.`};
            }

            for(const reg of this.dataMap[field].regex){
                if(!reg.pattern.test(payload[field])) return {status: false, message: reg.message};
            }
        }

        return {status: true};
    }
}

module.exports = { USER_MIDDLEWARE };