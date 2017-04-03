/**
 * Created by Flashbox on 6/30/2016.
 */

function successResponse(code, status,desc) {
    var response = [{
        "statusCode":code,
        "status":status,
        "Description":desc
    }]

    return response;
}

module.exports = {
    response: successResponse
}
