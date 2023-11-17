import { NestFactory } from '@nestjs/core';
import { OfferService } from './offer/offer.service';
import { OfferModule } from './offer/offer.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const offerService = app.select(OfferModule).get(OfferService);
  offerService.processOffersJob();
}
bootstrap();
