import db from '../Database/db.js'

// This function is used for selecting user data then checking if passwords match,
// incase of no results sends a message  that user doesnt exist.
// Used in: Login.js(Frontend side)

 export const Login = (req, res) => {
    const { idnum, password } = req.body;
    const q = "SELECT * FROM user WHERE idnum = ?;";

    db.query( q , idnum, (error, results) => {

        if (error) {
          console.log(error)
        }
  
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, (error, response) => {
            if (response) {
              req.session.user = results;
              console.log(req.session.user);
              res.send(results);
              console.log(results);
            } else {
              res.send({ message: "Wrong username/password combination!" });
            }
          });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      }
    );
  }
  
//This function checks if there is data saved to session and sets loggedIn variable to on or off, which will be used after.
// Used in: Login.js(Frontend side)

export const LogInSession = (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
      console.log({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false, user: req.session.user });
      console.log({ loggedIn: false, user: req.session.user });
    }
  }

