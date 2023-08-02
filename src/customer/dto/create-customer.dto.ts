import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsString()
  @IsNotEmpty()
  planId: string;

  @IsString()
  @IsNotEmpty()
  invoice: string;

  @IsNotEmpty()
  validateDate: Date;

  @IsNotEmpty()
  sendNotificationOn: {
    fiveDaysBefore: {
      active: boolean;
      sended: boolean;
    };
    threeDaysBefore: {
      active: boolean;
      sended: boolean;
    };
    oneDayBefore: {
      active: boolean;
      sended: boolean;
    };
    EndDay: {
      active: boolean;
      sended: boolean;
    };
    oneDayAfter: {
      active: boolean;
      sended: boolean;
    };
  };

  comment?: string;
}
