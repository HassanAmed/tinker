import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

class OfferDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsUrl()
  @Length(1, 255)
  thumbnail: string;

  @IsInt()
  @IsIn([0, 1])
  isDesktop: number;

  @IsInt()
  @IsIn([0, 1])
  isAndroid: number;

  @IsInt()
  @IsIn([0, 1])
  isIos: number;

  @IsUrl()
  @Length(1, 255)
  offerUrlTemplate: string;

  providerName: string | null;

  externalOfferId: string | null;
}

export default OfferDto;
