import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import Provider1 from './providers/provider1';
import Provider2 from './providers/provider2';

const providers = [
  {
    provide: 'Provider1',
    useClass: Provider1,
  },
  {
    provide: 'Provider2',
    useClass: Provider2,
  },
];
@Module({
  providers: [OfferService, ...providers],
  exports: [OfferService],
})
export class OfferModule {}
