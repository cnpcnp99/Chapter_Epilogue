const { User } = require('../models/User')
const { useAsyncStorage } = require('@react-native-async-storage/async-storage')
const storage = useAsyncStorage('nick')

// 인증 처리하는 곳
const auth = (req, res, next) => {

    //1. 클라이언트 쿠키에서 토큰을 가져온다.

    const result = storage.getItem()
    console.log('auth log↓↓↓↓↓↓↓↓↓↓')
    console.log(result)
    User.findByToken(result, (err, user) => {
        if(err) {
            console.log('error!')
            throw err
        }
        if(!user) {
            console.log('!user')
            return res.json({ isAuth: false, error: true })
        }
        console.log('auth OK')
        req.token = result
        req.user = user
        next()
    })

    // storage.getItem().then(result => {
    //     console.log(result)
    //     const token = result
        
    //     //token = UserInfo.token
    //     console.log('totken : ' + token)

    //     // 2. 토큰을 복호화 한 후 유저를 찾는다.
    //     User.findByToken(token, (err, user) => {
    //         if(err) {
    //             console.log('error!')
    //             throw err
    //         }
    //         if(!user) {
    //             console.log('!user')
    //             return res.json({ isAuth: false, error: true })
    //         }
    //         console.log('auth OK')
    //         req.token = token
    //         req.user = user
    //         next()
    //     })
    // }).catch(err => {
    //     console.log(err)
    //     return
    // })

    // storage.getItem('nick', (err, result) => {
    //     const UserInfo = Json.parse(result);
    //     if(err) {
    //         console.log('ERROR OCCURED')
    //         return;
    //     }
    //     token = UserInfo.token
    //     console.log('totken : ' + token)

    //     // 2. 토큰을 복호화 한 후 유저를 찾는다.
    //     User.findByToken(token, (err, user) => {
    //         if(err) {
    //             console.log('error!')
    //             throw err}
    //         if(!user) {
    //             console.log('!user')
    //             return res.json({ isAuth: false, error: true })}
    
    //         req.token = token
    //         req.user = user
    //         next()
    //     })
    // }).catch(err => {
    //     console.log('error')
    //     if(err) console.error(err)
    //     return
    // })
    


    
}

module.exports = { auth };