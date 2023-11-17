import { Expose, Transform } from 'class-transformer';
import OfferDto from './offer.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class Offer2Dto {
  @Expose()
  @Transform(({ value }) => value.campaign_id.toString())
  @IsNumberString()
  externalOfferId: string;

  @Expose()
  @Transform(({ value }) => value.name)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Transform(({ value }) => value.description)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @Transform(({ value }) => value.instructions)
  @IsString()
  @IsNotEmpty()
  requirements: string;

  @Expose()
  @Transform(({ value }) => value.icon)
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @Expose()
  @Transform(({ value }) => value.tracking_url)
  @IsString()
  @IsNotEmpty()
  offerUrlTemplate: string;

  @Expose()
  @Transform(({ value }) => (value.OS.web ? 1 : 0))
  @IsNumber()
  isDesktop: number;

  @Expose()
  @Transform(({ value }) => (value.OS.ios ? 1 : 0))
  @IsNumber()
  isIos: number;

  @Expose()
  @Transform(({ value }) => (value.OS.android ? 1 : 0))
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
      providerName: 'offer2',
    };
  }
}
