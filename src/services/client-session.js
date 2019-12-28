import * as session from "browser-session-store";
import Cookies from "universal-cookie";
var jwt = require("jsonwebtoken");

class ClientSession {
  static authkey = "auth";
  static loggedin = null;
  static cookies = new Cookies();

  static storeAuth = (value, func) => {
    session.put(ClientSession.authkey, value, err => func(err));
  };

  static getAuth = reciverfunc => {
    session.get(ClientSession.authkey, (err, value) => {
      reciverfunc(err, value);
    });
  };

  static removeAuth = func => {
    session.remove(ClientSession.authkey, err => {
      func(err);
    });
  };

  static isLoggedIn = func => {
    ClientSession.getAuth((err, value) => {
      if (err) {
        console.error(err);
        func(false);
      } else {
        if (value == null) {
          // console("valuee nulllll");
          // check if loggedin from third party
          if (ClientSession.cookies.get("access_token")) {
            console.log("from third party");
            ClientSession.storeAuth(
              {
                userId: ClientSession.cookies.get("userId", err => {
                  console.log(err);
                }),
                id: ClientSession.cookies.get("access_token", err => {
                  console.log(err);
                })
              },
              err => {
                console.log(err);
              }
            );
            func(true);
          } else {
            ClientSession.removeAuth(err => console.log(err));
            func(false);
          }
        } else if (true) {
          console.log("now", new Date().getTime());
          console.log(
            "createddd",
            parseInt(new Date().getTime()) - value.headers.expiry
          );
          func(true);
        } else {
          ClientSession.removeAuth(err => console.log(err));
          func(false);
        }
        console.log("whatt is the value", value);
      }
    });
  };

  static getLoggedInUser = cb => {
    console.log("get logggeddd");
    ClientSession.isLoggedIn(isLoggedIn => {
      if (isLoggedIn) {
        ClientSession.getAuth((err, value) => {
          console.log("valueeeee", value.body.data);
          return cb(value.body.data);
          // return cb(value.body.data.id);
        });
      } else {
        return null;
      }
    });
  };

  static getToken = () => {
    if (ClientSession.isLoggedIn()) {
      ClientSession.getAuth((err, value) => {
        if (err) {
          console.error(err);
          return false;
        } else {
          return value.id;
        }
      });
    }
  };

  static getAccessToken = callback => {
    ClientSession.isLoggedIn(function(isLoggedIn) {
      if (isLoggedIn) {
        ClientSession.getAuth((err, value) => {
          if (err) {
            console.error(err);
            callback(false, err);
          } else {
            callback(true, value);
          }
        });
      } else {
        callback(false, null);
      }
    });
  };
}

export default ClientSession;
