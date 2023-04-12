export const errorHandler = (err, req, res, next) => {
    if (err)
    {
        console.log({Title: "Error", Message: err.message, stackTrace: err.stack});
        res.send({Title: "Error", Message: err.message});
    }
    else{
        console.log("No Error, All Good");
    }
};