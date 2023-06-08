import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet, { HelmetOptions } from 'helmet';
import { Logger } from '@nestjs/common';

export async function webstack_bootstrap(
  app: INestApplication,
  options?: {
    port: number;
    helmet: HelmetOptions;
    logger: Logger;
    global_client_prefix: string;
  },
) {
  const logger = options?.logger ?? new Logger('Bootstrap');
  app.setGlobalPrefix(options?.global_client_prefix ?? 'api');
  app.use(
    helmet(
      options?.helmet ?? {
        contentSecurityPolicy: {
          directives: {
            imgSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
            styleSrc: [
              `'self'`,
              'data:',
              `'unsafe-inline'`,
              'https://cdn.jsdelivr.net',
            ],
            scriptSrc: ["'self'", "https: 'unsafe-inline'", "'unsafe-eval'"],
            objectSrc: ["'self'"],
            defaultSrc: [`'self'`],
          },
        },
        crossOriginEmbedderPolicy: false,
      },
    ),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(logger);
  await app.listen(options?.port ?? 3000);
  logger.verbose(`Application is running on: ${await app.getUrl()}`);
}
