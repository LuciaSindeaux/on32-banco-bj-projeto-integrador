import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//criacao de branch para poder fazer PR para main, para fazer CR favor conferir outros arquivos
