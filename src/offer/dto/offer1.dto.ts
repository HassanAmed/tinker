import { Expose, Transform } from 'class-transformer';
import OfferDto from './offer.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class Offer1Dto {
  @Expose()
  @Transform(({ obj }) => obj.offer_id)
  @IsNumberString()
  externalOfferId: string;

  @Expose()
  @Transform(({ obj }) => obj.offer_name)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.offer_desc)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @Transform(({ obj }) => obj.call_to_action)
  @IsString()
  @IsNotEmpty()
  requirements: string;

  @Expose()
  @Transform(({ obj }) => obj.image_url)
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @Expose()
  @Transform(({ obj }) => obj.offer_url)
  @IsString()
  @IsNotEmpty()
  offerUrlTemplate: string;

  @Expose()
  @Transform(({ obj }) => (obj.platform === 'desktop' ? 1 : 0))
  @IsNumber()
  isDesktop: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.device === 'iphone_ipad' ? 1 : obj.platform === 'mobile' ? 1 : 0,
  )
  @IsNumber()
  isIos: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.device !== 'iphone_ipad' && obj.platform === 'mobile' ? 1 : 0,
  )
  @IsNumber()
  isAndroid: number;

  toOfferDto(): OfferDto {
    return {
      externalOfferId: this.externalOfferId,
      name: this.name,
      slug: `${this.externalOfferId}/${this.name}`,
      description: this.description,
      requirements: this.requirements,
      thumbnail: this.thumbnail,
      offerUrlTemplate: this.offerUrlTemplate,
      isDesktop: this.isDesktop,
      isAndroid: this.isAndroid,
      isIos: this.isIos,
      providerName: 'offer1',
    };
  }
}
