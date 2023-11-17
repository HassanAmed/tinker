import OfferDto from 'src/offer/dto/offer.dto';
import { Offer1Dto } from 'src/offer/dto/offer1.dto';
import { Offer2Dto } from 'src/offer/dto/offer2.dto';

interface IProvider {
  validate(offerData: Offer1Dto | Offer2Dto): Promise<void>;
  transform(offerData: Offer1Dto | Offer2Dto): OfferDto;
  getOffers(): Offer1Dto[] | Offer2Dto[];
}

export default IProvider;
