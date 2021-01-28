exports.checkCondition = (fieldValue, conditionValue, condition) => {
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
    //when condition equals "gt"
    if(condition == "gt") {
        if(fieldValue > conditionValue){
            return true;
        }
    }
     //when condition equals "gte"
    if(condition == "gte") {
        if(fieldValue >= conditionValue){
            return true;
        }
    }
    //when condition equals "contains"
    if(condition == "contains") {
        if(fieldValue.includes(conditionValue)) {
            return true;
        }
    }
    return false;
   
}