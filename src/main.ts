import { NestFactory } from '@nestjs/core';
import { OfferService } from './offer/offer.service';
import { OfferModule } from './offer/offer.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.select(OfferModule).get(OfferService).processOffersJob();
}
bootstrap();
