import { Offer2Dto } from '../dto/offer2.dto';
import { plainToInstance } from 'class-transformer';
import OfferDto from '../dto/offer.dto';
import IProvider from './provider.interface';
import { payload } from '../payloads/offer2.payload';
import { validateOrReject } from 'class-validator';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
class Provider2 implements IProvider {
  private readonly logger = new Logger(Provider2.name);

  getOffers(): Offer2Dto[] {
    const offers = Object.values(payload.data).map((offer) => {
      try {
        return plainToInstance(Offer2Dto, offer, {
          enableImplicitConversion: true,
          excludeExtraneousValues: true,
        });
      } catch (e) {
        this.logger.warn(
          `getOffers validation failed for offer-2 ${offer.Offer.campaign_id}`,
        );
      }
    });
    return offers;
  }

  async validate(offer: Offer2Dto) {
    await validateOrReject(offer);
  }

  transform(offer: Offer2Dto): OfferDto {
    return offer.toOfferDto();
  }
}

export default Provider2;
