import LModel from "./api";
// import ClientSession from "./client-session.js";

const pluralName = "applicants";

class User {
  static login = (email, password) => {
    const url = pluralName + "/login";
    if (email && password) {
      const regExp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      // user can login with both email or password

      return LModel.create(url, {
        [regExp.test(email) ? "email" : "username"]: email,
        password: password,
        ttl: 300000000
      })
        .then(response => {
          ClientSession.storeAuth(response.data, err => {
            return err ? console.error("cannot save session") : "";
          });
          return {
            success: true,
            message: "Logged in successfuly",
            user: response.data
          };
        })
        .catch(err => {
          return err;
        });
    }
  };

  static register = values => {
    /**
     * this one will double check if the required field is g fill or not (email and password)
     */
    if (values.email && values.password) {
      return LModel.create(pluralName, values)
        .then(
          response => {
            return {
              success: true,
              message: "Registered successfully  go to the email and  conform",
              user: response.data
            };
          },
          error => {
            console.log("Error", error);
            if (error.response) {
              if (error.response.status === 422) {
                return {
                  error: true,
                  message: error.response.data.error.message
                };
              }
            } else {
              console.log("the general error1 is ", error);
              return {
                error: true,
                message: "Oops error occurred please. Try Again"
              };
            }
          }
        )
        .catch(error => {
          console.log("the general error1 is ", error);
          return {
            error: true,
            message: "Oops error Occurred please. Try Again"
          };
        });
    }
  };
}

export default User;
