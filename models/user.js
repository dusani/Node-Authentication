const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

let User;

//---- User Schema ----//
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: { type: String },
    username: { type: String },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

//---- Validation ----//
UserSchema.path("email").validate(email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}, "Invalid Email Address");

//---- Filters ----//
UserSchema.pre("save", function(next) {
    const user = this;

    // only hash the password if it has been modified or is new
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password uisng the new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next();

            user.password = hash;
            next();
        });
    });
});

//---- Static Methods ----//

UserSchema.static("attemptLogin", (email, password, callback) => {
    User.findByEmail(email, (err, user) => {
        if (err) return callback(err);

        if (!user) return callback();

        user.comparePassword(password, (err, isMatch) => {
            if (err) return callback(err);

            if (isMatch) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

UserSchema.static("findByEmail", (email, callback) => {
    User.findOne({ email: email }, callback);
});

//---- Virtul Fields ----//
UserSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
});

User = mongoose.model("user", UserSchema);

module.exports = User;
