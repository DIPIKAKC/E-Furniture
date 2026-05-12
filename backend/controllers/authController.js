export const googleAuthSuccess = (req, res) => {
    const token = jwt.sign(
        {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    );

    res.redirect(
        `https://e-furniture-ivory.vercel.app/oauth-success?token=${token}`
    );
};

export const googleAuthFailure = (req, res) => {
    res.redirect("https://e-furniture-ivory.vercel.app/authentication");
};