const type = {
    SIMPLE:1,
    COMPLEX: 2
};

type.get = function(value){
    return Object.keys(status).find(key => status[key] === value);
};

type.toString = function(value){
    switch (value)
    {
        case 1:     return "Simple execution";
        case 2:     return "Form execution";
        default:    return "";
    }
};

export default type;