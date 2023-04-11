export const errorHandler = (err, req, res, next) => {
    if (err)
    {
        res.send({Title: "Error", Message: err.message, stackTrace: err.stack})
    }
    else{
        console.log("No Error, All Good");
    }
};