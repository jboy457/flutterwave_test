const { successResponseMsg, errorResponseMsg } = require('./utils/response');
const { validationRule } = require('./utils/validate');
const { validationResult } = require('express-validator');

const toCheckCondition = (fieldValue, conditionValue, condition) => {
    //when condition equals "eq"
    if(condition == "eq") {
        if(fieldValue == conditionValue){
            return true;
        }
    }
    //when condition equals "neq"
    if(condition == 'neq') {
        if(fieldValue != conditionValue){
            return true;
        }
    }
   
    if(condition == "gt") {
        if(fieldValue > conditionValue){
            return true;
        }
    }
    
    if(condition == "gte") {
        if(fieldValue >= conditionValue){
            return true;
        }
    }
   
    if(condition == "contains") {
        if(fieldValue.includes(conditionValue)) {
            return true;
        }
    }
    return false;
   
}

module.exports = {
    getUser: async (req, res) => {
        try {
            const userData = {
                name: 'Taiwo Adejare',
                github: '@jboy457',
                email: 'adejareemma@gmail.com',
                mobile: '07085496237',
                twitter: '@jboy_code'
            }

            return successResponseMsg(res, 200, 'My Rule-Validation API.', userData);
        } catch (err) {
            return errorResponseMsg(res, 500, `${err.message}.`, null);
        }
    },
    validationRule,
    validationRuleController: async (req, res) => {
        try {
            const bodyData = req.body;
            const { rule, data } = bodyData;

            //check valid payload
            if(typeof rule === "undefined") {
                return errorResponseMsg(res, 400, 'Invalid JSON payload passed.', null)
            }
            if(typeof data === "undefined") {
                return errorResponseMsg(res, 400, 'Invalid JSON payload passed.', null)
            }
            const { field, condition, condition_value } = rule;

            //validate body data
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = errors.array();
                const message = `${err[0].msg}`;
                return errorResponseMsg(res, 400, message, null);
            }

            
            var error = true;
            var fieldValue = field.split('.');
            var value = data[fieldValue[0]];
            // console.log(data[fieldValue[0]][fieldValue[1]]);
            if(fieldValue[1]) {
                value = data[fieldValue[0]][fieldValue[1]];
            }
            //validate with rule
            
            if(typeof value !== "undefined") {
                const conditionCheck = toCheckCondition(value, condition_value, condition);
                fieldValue = value;
                if(conditionCheck) {
                    error = false;
                } else {
                    error = true;
                }
            }else {
                return errorResponseMsg(res, 400, `field ${field} is missing from data.`, null) 
            }

     
            const result = {
                "validation": {
                    "error": error,
                    "field": rule.field,
                    "field_value": fieldValue,
                    "condition": rule.condition,
                    "condition_value": rule.condition_value
                }
            }

            if(error == true) {
                return errorResponseMsg(res, 400, `field ${field} failed validation.`, result)
            }
           
            return successResponseMsg(res, 200, `field ${field} successfully validated.`, result);
        } catch (err) {
            console.log(err);
            return errorResponseMsg(res, 500, `${err.message}.`, null);
        }
    }
}