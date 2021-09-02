const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const descriptionSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId, // 이렇게만 써도 User에 있는 id를 통해 User의 모든 정보를 가져올 수 있음
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    attachments: {
        type: Array
    }
}, { timestamps: true })


const Description = mongoose.model('Description', descriptionSchema)

module.exports = { Description }