import { plainToInstance } from 'class-transformer';
import OfferDto from '../dto/offer.dto';
import IProvider from './provider.interface';
import { validateOrReject } from 'class-validator';
import { payload } from '../payloads/offer1.payload';
import { Offer1Dto } from '../dto/offer1.dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
class Provider1 implements IProvider {
  private readonly logger = new Logger(Provider1.name);

  getOffers(): Offer1Dto[] {
    const offers = payload.response.offers.map((offer) => {
      try {
        return plainToInstance(Offer1Dto, offer, {
          enableImplicitConversion: true,
          excludeExtraneousValues: true,
        });
      } catch (e) {
        this.logger.warn(
          `getOffers validation failed for offer-1 ${offer.offer_id}`,
        );
      }
    });
    return offers;
  }

  async validate(offer: Offer1Dto) {
    await validateOrReject(offer);
  }

  transform(offer: Offer1Dto): OfferDto {
    return offer.toOfferDto();
  }
}
export default Provider1;
