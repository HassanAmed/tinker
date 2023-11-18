import { Expose, Transform } from 'class-transformer';
import OfferDto from './offer.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Offer2Dto {
  @Expose()
  @Transform(({ obj }) =>
    obj.Offer.campaign_id ? obj.Offer.campaign_id.toString() : null,
  )
  externalOfferId: string | null;

  @Expose()
  @Transform(({ obj }) => obj.Offer.name)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.Offer.description)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @Transform(({ obj }) => obj.Offer.instructions)
  @IsString()
  @IsNotEmpty()
  requirements: string;

  @Expose()
  @Transform(({ obj }) => obj.Offer.icon)
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @Expose()
  @Transform(({ obj }) => obj.Offer.tracking_url)
  @IsString()
  @IsNotEmpty()
  offerUrlTemplate: string;

  @Expose()
  @Transform(({ obj }) => (obj.OS.web ? 1 : 0))
  @IsNumber()
  isDesktop: number;

  @Expose()
  @Transform(({ obj }) => (obj.OS.ios ? 1 : 0))
  @IsNumber()
  isIos: number;

  @Expose()
  @Transform(({ obj }) => (obj.OS.android ? 1 : 0))
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
