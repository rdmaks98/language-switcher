// src/phrase/phrase.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PharseService {
    constructor(
        @InjectModel('Phrase') private readonly pharseModel,
    ) { }


    async pharseList() {
        const phrase = await this.pharseModel.find().select('-translations');
        if (!phrase) {
            throw new NotFoundException('Phrase not found');
        }
        return phrase;
    }

    async findById(id: string) {
        const phrase = await this.pharseModel.findById(id).select('-translations');
        if (!phrase) {
            throw new NotFoundException('Phrase not found');
        }
        return phrase;
    }

    async findTranslation(id: string, lang: string) {
        const phraseResult = await this.pharseModel.findById(id, { [`translations.${lang}`]: 1 })
        if (!phraseResult) {
            throw new NotFoundException(`Translation not found for this language ${lang}`);
        }

        return phraseResult;
    }

    async searchPharseByQuery(query, sortBy, sortOrder, status) {

        const searchQuery = {
            phrase: { $regex: query, $options: 'i' }, // Case-insensitive search
            status: status,
        };

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const result = await this.pharseModel.find(searchQuery).sort(sortOptions)
        if (result.length <= 0) {
            throw new NotFoundException('this keyword value not exist')
        }
        return result
    }
}
