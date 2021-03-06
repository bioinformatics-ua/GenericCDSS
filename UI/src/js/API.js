import axios from 'axios';
import {api_url} from '../../package.json';

const API = axios.create({
    baseURL: api_url,
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    withCredentials: true
});

/*
 * The webservices are called using the baseURL + one of these constants
 */
const languageURL                       = 'utils/language';
const aboutURL                          = 'utils/about';
const helpURL                           = 'utils/help';
const homeURL                           = 'utils/home';
const settingsURL                       = 'utils/settings';

const authURL                           = 'accounts';

const patientURL                        = 'patients/patient';
const patientclinicalvariablesURL       = 'patients/patientclinicalvariables';
const clinicalvariablesURL              = 'patients/clinicalvariables';
const admissionURL                      = 'patients/admission';

const protocolURL                       = 'protocols/protocol';
const protocolcomponentsURL             = 'protocols/protocol/protocolInquiryComponents';
const scheduleURL                       = 'protocols/schedule';
const assignedprotocolsURL              = 'protocols/assignedprotocols';
const executedprotocolsURL              = 'protocols/executedprotocols';

/*
 * Function to retrieve the URL from each module
 */
const getModuleURL = function (module) {
    switch (module){
        case "account":                     return authURL;
        case "patient":                     return patientURL;
        case "patientclinicalvariables":    return patientclinicalvariablesURL;
        case "clinicalvariables":           return clinicalvariablesURL;
        case "admission":                   return admissionURL;
        case "language":                    return languageURL;
        case "about":                       return aboutURL;
        case "help":                        return helpURL;
        case "home":                        return homeURL;
        case "protocol":                    return protocolURL;
        case "schedule":                    return scheduleURL;
        case "assignedprotocols":           return assignedprotocolsURL;
        case "executedprotocols":           return executedprotocolsURL;
        case "protocolcomponents":          return protocolcomponentsURL;
        case "settings":                    return settingsURL;
        default:                            return "";
    }
};

/*
 * Function to build the get webservices path
 */
const buildGETPath = function (globalPath, urlPath, filter) {
    if (urlPath === undefined)
        return globalPath + "/";

    if (filter === undefined)
        return globalPath + "/" + urlPath + "/";

    return globalPath + "/?" + filter + "=" + urlPath;
};

/*
 * Function to build the post webservices path
 */
const buildPOSTPath = function (globalPath, urlPath) {
    if (urlPath === undefined || urlPath === null)
        return globalPath + "/";

    return globalPath + "/" + urlPath + "/";
};

/*
 * The function receive:
 * module: which is a string to define which webservice module to call
 * utlPath: is the rest of the path
 * parameters: are the parameters to send in the post
 * */
API.PATCH = function (module, urlPath, parameters) {
    let url = getModuleURL(module);
    let path = buildPOSTPath(url, urlPath);
    return API.patch(path, parameters);
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
API.GET = function (module, urlPath, filter) {
    let url = getModuleURL(module);
    let path = buildGETPath(url, urlPath, filter);
    return API.get(path);
};

export default API;
