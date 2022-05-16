const { Schema, model} = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
        createdAt: { type: Date, default: Date.now,  },
        username: { type: String, required: true },
        reactions: [Reaction]
    },
    {
        toJson: {
            virtuals: true
        },
        id: false
    }
);

thoughtSchema.method('getDate', function() {
    const date = new Date(this.createdAt);
    const formatted = `${date.getMonth()} ${date.getDay}, ${date.getFullYear()}`;
    return formatted;
});

thoughtSchema.virtual('reactionCount', function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;