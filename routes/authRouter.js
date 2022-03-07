require('dotenv').config()
const { Router } = require('express');
const jwt = require('jsonwebtoken')
const UserModel = require('../db/user')
const router = Router();

const getUser = async (userId) => {
    const user = await UserModel.findOne({ userId });
    return user;
}

// 로그인 시 jwt token 발급 -> 쿠키에 담아 리턴
router.post('/', async (req, res) => {
    const { userId, password } = req.body;
    const user = await getUser(userId);
    console.log("로그인 요청을 한 유저의 유저정보 >>", user)

    if (user.password !== password) {
        return res.status(403).json({ msg: "Invalid password" });
    }
    // user.userId만 payload에 담아 jwt token을 발급한다.
    const token = jwt.sign({userId: user.userId}, process.env.SECRET_KEY_JWT, { expiresIn: "1h" });
    res.cookie("token", token);
    return res.json({ token });
})

module.exports = router;