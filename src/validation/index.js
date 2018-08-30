const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.url = !isEmpty(data.url) ? data.url : '';
    data.name = !isEmpty(data.name) ? data.name : '';

    if(!Validator.isURL(data.url)) {
        errors.url = 'URL is invalid';
    }

    if(Validator.isEmpty(data.url)) {
        errors.url = 'URL is required';
    }

    if(!Validator.isLength(data.name, { min: 2 })) {
        errors.name = 'URL name must have min 6 chars';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}