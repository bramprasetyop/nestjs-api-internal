import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from '@wahyoo/wahyoo-shared';
import { RabbitMQConsumerServer } from '@wahyoo/wahyoo-shared';

const logger = new Logger();
const PORT = process.env.PORT || 3001;

async function bootstrap() {
  // run main app
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice({
    strategy: new RabbitMQConsumerServer(config.rabbitMQConfig)
  });
  await app.startAllMicroservices();
  await app.listen(PORT);
  logger.log(`Listening on ${PORT}`);
  logger.log(`Running env: ${config.env}`);
  process.setUncaughtExceptionCaptureCallback(err => {
    console.error(err);
  });
  process.on('unhandledRejection', err => console.error(err));
}
bootstrap();
