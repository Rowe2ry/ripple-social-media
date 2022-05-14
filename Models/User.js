const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String , required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: props => `${props} is not a valid email address.`
        } },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJson: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount')
.get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;