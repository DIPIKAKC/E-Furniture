import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = decoded; // attach user info

            next();
        } catch (error) {
            return res.status(401).json({
                message: "Not authorized, token failed",
            });
        }
    } else {
        return res.status(401).json({
            message: "No token provided",
        });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({
            message: "Access denied: Admin only",
        });
    }
};