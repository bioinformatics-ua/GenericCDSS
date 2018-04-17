const status = {
    ADMITTED:1,
    DISCHARGED: 2
};

status.get = function(value){
    return Object.keys(status).find(key => status[key] === value);
};

export default status;