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
  @Transform(({ value }) => value.offer_id)
  @IsNumberString()
  externalOfferId: string;

  @Expose()
  @Transform(({ value }) => value.offer_name)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Transform(({ value }) => value.offer_desc)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @Transform(({ value }) => value.call_to_action)
  @IsString()
  @IsNotEmpty()
  requirements: string;

  @Expose()
  @Transform(({ value }) => value.image_url)
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @Expose()
  @Transform(({ value }) => value.offer_url)
  @IsString()
  @IsNotEmpty()
  offerUrlTemplate: string;

  @Expose()
  @Transform(({ value }) => (value.platform === 'desktop' ? 1 : 0))
  @IsNumber()
  isDesktop: number;

  @Expose()
  @Transform(({ value }) =>
    value.device === 'iphone_ipad' ? 1 : value.platform === 'mobile' ? 1 : 0,
  )
  @IsNumber()
  isIos: number;

  @Expose()
  @Transform(({ value }) =>
    value.device !== 'iphone_ipad' && value.platform === 'mobile' ? 1 : 0,
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
