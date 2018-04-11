
const getPatientTableRows = function() {
    let headerSize = 72;
    let footerSize = 60 ;
    let tableHeaderSize = 39 + 26 + 40 + 46;
    let rowSize = 35;

    if(document.getElementById('header') !== null)
        headerSize = document.getElementById('header').clientHeight;

    return  Math.floor((window.innerHeight - headerSize - footerSize - tableHeaderSize)/rowSize);
};


export default {getPatientTableRows};