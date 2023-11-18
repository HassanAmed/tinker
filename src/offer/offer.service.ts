import { Injectable, Inject, Logger } from '@nestjs/common';
import OfferDto from './dto/offer.dto';
import IProvider from './providers/provider.interface';
import Offer from 'src/offer/entities/offer.entity';
import Provider1 from './providers/provider1';
import Provider2 from './providers/provider2';

@Injectable()
export class OfferService {
  private readonly logger = new Logger(OfferService.name);
  private readonly offerProviders: IProvider[];

  constructor(
    @Inject('Provider1') private p1: Provider1,
    @Inject('Provider2') private p2: Provider2,
  ) {
    this.offerProviders = [this.p1, this.p2];
  }

  async processOffersJob() {
    if (!this.offerProviders.length) {
      throw new Error(`No providers available`);
    }

    const offerDtos: OfferDto[] = [];
    for (const provider of this.offerProviders) {
      const offers = provider.getOffers();
      for (const offer of offers) {
        try {
          await provider.validate(offer);
          const offerDto = provider.transform(offer);
          offerDtos.push(offerDto);
        } catch (e) {
          this.logger.warn(
            `validation failed for offer ${offer?.externalOfferId}`,
          );
        }
      }
    }
    this.OfferDtoToOffers(offerDtos);
  }

  private OfferDtoToOffers(offerDtos: OfferDto[]) {
    const offers = offerDtos.map((offerDto) => {
      const offer = new Offer();

      offer.name = offerDto.name;
      offer.slug = offerDto.slug;
      offer.description = offerDto.description;
      offer.requirements = offerDto.requirements;
      offer.thumbnail = offerDto.thumbnail;
      offer.offerUrlTemplate = offerDto.offerUrlTemplate;
      offer.isDesktop = offerDto.isDesktop;
      offer.isAndroid = offerDto.isAndroid;
      offer.isIos = offerDto.isIos;
      offer.providerName = offerDto.providerName;
      offer.externalOfferId = offerDto.externalOfferId;

      return offer;
    });

    this.logger.log(`${Object.keys(offers).length} Offers processed successfuly
    OFFERS PROCESSED: 
    ${JSON.stringify(offers, null, 2)}`);
  }
}
