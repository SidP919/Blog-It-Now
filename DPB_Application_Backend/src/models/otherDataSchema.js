const {Schema, model} = require('mongoose');

const otherDataSchema = Schema({
    key: {
        type: String,
        unique: [true, 'Another key with same name already exists!']
    },
    value: {
        type: String,
        maxLength: [500, 'Max Length Exceeded!']
    },
},{
    timestamps: true,
});

const OtherData = model('otherData', otherDataSchema);

module.exports = OtherData;