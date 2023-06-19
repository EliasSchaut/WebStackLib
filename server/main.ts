import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            "'self'",
            'data:',
            'https://www.gravatar.com',
            'https://validator.swagger.io',
          ],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          scriptSrc: ["'self'", "https: 'unsafe-inline'", "'unsafe-eval'"],
          objectSrc: ["'self'"],
          defaultSrc: [`'self'`],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PORT) + 1);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().then();
