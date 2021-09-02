const { useAsyncStorage } = require('@react-native-async-storage/async-storage')
const storage = useAsyncStorage('nick')
const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require('../middleware/auth')

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    console.log('/auth in users.js')
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        image: req.user.image,
    });
});

router.get('/hello', (req, res) => {
    res.status(200).json({
        success: true
    })
})

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/register/duplicate', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        }
        if (!user) {
            return res.json({
                success: true,
                duplicate: false
            })
        }
        return res.status(200).json({
            success: true,
            duplicate: true
        })
    })
})



router.post("/login", (req, res) => {
    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                type: 'id',
                message: "Auth failed, email not found"
            });
        }
        // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    type: 'pw',
                    message: 'Auth failed, PW is not matched'
                })

            // 3. 비밀번호까지 동일하면 토큰을 생성한다
            user.generateToken((err, user) => {
                if (err) return res.json({
                    loginSuccess: false,
                    type: 'pw',
                    message: err.message
                })

                // 토큰을 저장한다. (쿠키, 로컬 저장소, 세션... 등등이 있지만 여기서는 쿠키로 저장)
                // storage.setItem('nickname', JSON.stringify(user.token), (err) => {
                //     if(err) {
                //         console.log(err.message)
                //         return res.json({
                //             loginSuccess: false,
                //             type: 'pw',
                //             message: err.message
                //         })
                //     }
                //     console.log('Token is successfully stored in the local storage.')
                //     return res.status(200).json({
                //         loginSuccess: true, 
                //         userId: user._id 
                //     })
                // })
                try {
                    storage.setItem(user.token)
                    console.log('Token: ' + JSON.stringify(user.token))
                    const token =  storage.getItem()
                    console.log(token)
                } catch (e) {
                    console.log('error ↓↓↓↓')
                    console.log(e)
                    return res.json({
                        loginSuccess: false,
                        type: 'pw',
                        message: e
                    })
                }
                console.log('Token is successfully stored in the local storage.')
                return res.status(200).json({
                    loginSuccess: true,
                    userId: user._id
                })
            })
        })
    })
});

router.get("/logout", auth, (req, res) => {
    console.log('logout ON')
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        storage.removeItem()
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
