import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                const logger = new Logger('DatabaseModule');
                const uri = process.env.MONGO_DB_URL;

                try {
                    logger.log('language switcher connect to the database...');

                    const options = {
                        uri
                    };

                    logger.log('Database connection successful!');
                    return options;

                } catch (error) {
                    logger.error('Database connection failed!', error.stack);
                    throw error;
                }
            },
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }
