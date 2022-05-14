const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: { type: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }
);

reactionSchema.method('getDate', function() {
    const date = new Date(this.createdAt);
    const formatted = `${date.getMonth()} ${date.getDay()}, ${date.getFullYear()}`;
    return formatted;
});

module.exports = reactionSchema;