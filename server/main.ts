import { createApp } from '@/nest';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await createApp();
  await app.listen(Number(process.env.PORT) + 1);
  const logger = new Logger();
  logger.verbose(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then();
