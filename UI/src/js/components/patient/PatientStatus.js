const status = {
    ADMITTED:1,
    DISCHARGED: 2
};

status.get = function(value){
    return Object.keys(status).find(key => status[key] === value);
};

status.toString = function(value){
    switch (value)
    {
        case 1:     return "Internado";
        case 2:     return "";
        default:    return "";
    }
};

export default status;