import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import Provider1 from './providers/provider1';
import Provider2 from './providers/provider2';

@Module({
  providers: [
    OfferService,
    { provide: 'Provider1', useClass: Provider1 },
    { provide: 'Provider2', useClass: Provider2 },
  ],
  exports: [OfferService],
})
export class OfferModule {}
