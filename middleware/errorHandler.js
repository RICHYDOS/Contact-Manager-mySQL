export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    let result;
    if (statusCode == 400){
        result = {title: "Validation Error", message: err.message, stackTrace: err.stack}
    }
    else if (statusCode == 401){
        result = {title: "Unauthorised", message: err.message, stackTrace: err.stack}
    }
    else if (statusCode == 403){
        result = {title: "Forbidden", message: err.message, stackTrace: err.stack}
    }
    else if (statusCode == 404){
        result = {title: "Not Found", message: err.message, stackTrace: err.stack}
    }
    else if (statusCode == 500){
        result = {title: "Server Error", message: err.message, stackTrace: err.stack}
    }
    else{
        console.log("No Error, All Good");
    }
    res.send(result); 
};