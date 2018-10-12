
const getPatientTableRows = function(extraSize=0) {
    let headerSize = 65;
    let footerSize = 70 ;
    let tableHeaderSize = 42 + 29 + 39 + 47;
    let rowSize = 35;

    return  Math.floor((window.innerHeight - headerSize - footerSize - tableHeaderSize - extraSize)/rowSize);
};


export default {getPatientTableRows};