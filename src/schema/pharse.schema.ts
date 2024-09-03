import mongoose, { Schema, model, Document } from 'mongoose';
import { phraseStatus } from '../enums/pharse.enum';

const PhraseSchema = new mongoose.Schema({
    phrase: { type: String, required: true },
    status: {
        type: String,
        default: phraseStatus.ACTIVE,
        enum: phraseStatus,
        required: true,
    },
    translations: { type: Map, of: String, default: {} },
}, { timestamps: true });

export default PhraseSchema;
