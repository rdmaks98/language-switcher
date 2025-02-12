import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get api request url and method
  app.use(async (req, res, next) => {
    console.log(`👉 Endpoint: ${req.originalUrl} Method: ${req.method}`);
    next();
  });

  // here configure a service file
  const configService = app.get(ConfigService);

  app.enableCors();

  // Retrieve the PORT from a environment variables
  const port = configService.get<number>('port') || 4004;

  // listen a port and run the server
  await app.listen(port, () => {
    console.log(`server is running on the ${port}`)
  });
}
bootstrap();
