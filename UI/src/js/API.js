import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    withCredentials: true
});

/*
 * The webservices are called using the baseURL + one of these constants
 */
const footerURL                 = 'utils/footer';
const headerURL                 = 'utils/header';
const authURL                   = 'accounts';
const patientURL                = 'patients/patient';
const clinicalvariablesURL      = 'patients/clinicalvariables';

/*
 * Function to retrieve the URL from each module
 */
const getModuleURL = function (module) {
    switch (module){
        case "account":             return authURL;
        case "patient":             return patientURL;
        case "clinicalvariables":   return clinicalvariablesURL;
        case "footer":              return footerURL;
        case "header":              return headerURL;
        default:                    return "";
    }
};

/*
 * Function to build the get webservices path
 */
const buildGETPath = function (globalPath, urlPath, extraPath) {
    if (urlPath === undefined)
        return globalPath;

    let path = globalPath + "/" + urlPath;

    if(extraPath !== undefined)
        for (let index = 0; index < extraPath.length; index++)
            path += "/" + extraPath[index];

    path += "/";
    return path;
};

/*
 * Function to build the post webservices path
 */
const buildPOSTPath = function (globalPath, urlPath) {
    return globalPath + "/" + urlPath + "/";
};

/*
 * The function receive:
 * module: which is a string to define which webservice module to call
 * utlPath: is the rest of the path
 * parameters: are the parameters to send in the post
 * */
API.POST = function (module, urlPath, parameters) {
    let url = getModuleURL(module);
    let path = buildPOSTPath(url, urlPath);
    return API.post(path, parameters);
};

/*
 * The function receive:
 * module: which is a string to define which webservice module to call
 * utlPath: is the rest of the path
 * extraPath: is a array to have more fields in the path (maybe it is not necessary)
 * */
API.GET = function (module, urlPath, extraPath) {
    let url = getModuleURL(module);
    let path = buildGETPath(url, urlPath, extraPath);
    return API.get(path);
};

export default API;