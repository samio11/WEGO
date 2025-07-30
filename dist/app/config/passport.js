"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_model_1 = require("../modules/user/user.model");
const user_interfaces_1 = require("../modules/user/user.interfaces");
const driver_model_1 = require("../modules/driver/driver.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const _1 = __importDefault(require("."));
const rider_model_1 = require("../modules/rider/rider.model");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield user_model_1.User.findOne({ email });
        if (!foundUser) {
            return done(null, false, { message: "User is not Exits" });
        }
        if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.isBlocked) === true) {
            return done(null, false, { message: "User is Blocked" });
        }
        if (foundUser.role === user_interfaces_1.ERole.DRIVER) {
            const foundDriver = yield driver_model_1.Driver.findOne({ userId: foundUser._id });
            if (!foundDriver) {
                return done(null, false, { message: "Driver is Not Exists" });
            }
            if (foundDriver.isApproved === false) {
                return done(null, false, {
                    message: "Please wait for Admin Approve",
                });
            }
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, foundUser.password);
        if (!passwordMatch) {
            return done(null, false, { message: "Password is Incorrect" });
        }
        return done(null, foundUser);
    }
    catch (err) {
        return done(err);
    }
})));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: _1.default.GOOGLE_CLIENT_ID,
    clientSecret: _1.default.GOOGLE_CLIENT_SECRET,
    callbackURL: _1.default.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = profile === null || profile === void 0 ? void 0 : profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
        if (!email) {
            return done(null, false, { message: "Please Set Email in Google" });
        }
        let user = yield user_model_1.User.findOne({ email });
        // Google Login Only For-> Rider
        if (!user) {
            user = yield user_model_1.User.create({
                name: profile === null || profile === void 0 ? void 0 : profile.displayName,
                email,
                password: Math.random().toString(36).substring(2),
                phone: "N/A",
                profileImage: (_b = profile.photos) === null || _b === void 0 ? void 0 : _b[0].value,
                role: user_interfaces_1.ERole.RIDER,
            });
            yield rider_model_1.Rider.create({ userId: user._id });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(id);
        done(null, user);
    }
    catch (error) {
        console.log(error);
        done(error);
    }
}));
