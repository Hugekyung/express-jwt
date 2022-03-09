const jwt = require('jsonwebtoken');

exports.jwtAuthCheck = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.user = user; // req.user에 유저 정보 할당
        next();
    } catch (err) {
        return res.status(403).clearCookie("token").json({ msg: "token does not matched."});
    }
}