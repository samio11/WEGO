"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const ride_routes_1 = require("../modules/ride/ride.routes");
const driver_routes_1 = require("../modules/driver/driver.routes");
exports.rootRouter = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/ride",
        element: ride_routes_1.rideRoutes,
    },
    {
        path: "/driver",
        element: driver_routes_1.driverRoutes,
    },
];
moduleRoutes.forEach((x) => exports.rootRouter.use(x.path, x.element));
