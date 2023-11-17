import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

class OfferDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsUrl()
  thumbnail: string;

  @IsInt()
  isDesktop: number;

  @IsInt()
  isAndroid: number;

  @IsInt()
  isIos: number;

  @IsUrl()
  offerUrlTemplate: string;

  @IsString()
  providerName: string;

  @IsString()
  externalOfferId: string;
}

export default OfferDto;
