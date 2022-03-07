require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const UserModel = require('./db/user')

const authRouter = require('./routes/authRouter');
const { jwtAuthCheck } = require('./middleware/jwtAuthCheck');
const app = express();
const port = 3030

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Connect MongoDB
connectionDB().catch(err => console.log(err));
async function connectionDB() {
    await mongoose.connect(process.env.MONGODB_URI).then(async () => {
        // 테스트 용 유저 데이터 생성
        const existUser = await UserModel.findOne({ userId: "test1234" });
        if (existUser) {
            console.log("User already exists~")
        } else {
            UserModel.create({
                userId: "test1234",
                password: "1234"
            })
            console.log("User created!")
        }
    }).then(() => {
        console.log('Connected to MongoDB ~ SUCCESS')
    })
}

app.get("/", (req, res) => {
    res.json({ statusCode: 200 })
})

// jwtAuthCheck 미들웨어를 통해 jwt token이 유효한지 확인 후 request 수행
app.post("/request", jwtAuthCheck, (req, res) => {
    console.log(req.user)
    res.json({ statusCode: 200 , msg: "good Request"})
})

app.use('/auth', authRouter) // 로그인 라우터

app.listen(port, () => {
    console.log(`listening on ${port}`)
})