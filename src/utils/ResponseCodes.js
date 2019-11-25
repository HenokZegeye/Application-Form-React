

class ResponseCodes {


    static MSG_VALIDATION_ERROR = "Validation error, please check your form"

    static getResponseMessag(statusCode){

        switch(statusCode){
            case 400:
                return "Bad Requst"
            case 422:
                return this.MSG_VALIDATION_ERROR
            case 401:
                return "You are Unautorized to access this resource !"
            case 404:
                return "Page Not Found"
            case 500:
                return "Server Error,try again later"
            default:
                return "Oops something happend !!"                  
        }
    }

}

export default ResponseCodes;