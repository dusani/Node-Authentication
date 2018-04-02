const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect("mongodb://admin:admin@ds117859.mlab.com:17859/auth", err => {
    if (err) throw err;

    //---- create a new document using our model ----//
    // const me = new User({
    //   firstName: "Daniel",
    //   lastName: "Usani",
    //   username: "dusani",
    //   email: "dusani@techlaunch.io",
    //   password: "securePassword"
    // });
    //
    // me.save(err => {
    //   if (err) throw err;
    //
    //   User.find((err, users) => {
    //     if (err) throw err;
    //
    //     console.log(users);
    //     process.exit();
    //   });
    // });

    //---- find a user by ID ----//
    // User.findById("5abd8d0e1126fc130f48964b", (err, user) => {
    //   if (err) throw err;
    //
    //   console.log(user);
    //   process.exit();
    // });

    // find a user by Email
    // User.find({ email: "dusani@techlaunch.io" }, (err, user) => {
    //   if (err) throw err;
    //
    //   console.log(user);
    //   process.exit();
    // });

    //---- finding a user using queries ----//
    // const query = {
    //   email: /dusani@techlaunch.io/
    // };
    //
    // User.findOne(query, (err, user) => {
    //   if (err) throw err;
    //
    //   console.log(user.fullName);
    //   process.exit();
    // });

    //---- Finding and validation users when they log in ----//
    const email = "dusani@techlaunch.io";
    const password = "securePassword";

    // User.findByEmail(email, (err, user) => {
    //   if (err) throw err;

    //   user.comparePassword(password, (err, isMatch) => {
    //     if (err) throw err;
    //
    //     if (isMatch) {
    //       console.log("You are logged in!!! Be Happy");
    //     } else {
    //       console.log("Please try again");
    //     }
    //     process.exit();
    //   });
    // });

    User.attemptLogin(email, password, (err, user) => {
        if (user) {
            console.log("Welcome", user.fullName);
        } else {
            console.log("Invalid Username or Password");
        }
        process.exit();
    });
});
