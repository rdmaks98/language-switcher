import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../../.env.development'),
});

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [() => ({
                database_url: process.env.MONGO_DB_URL,
                port: parseInt(process.env.PORT) || 2020
            })],
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigureModule { }
