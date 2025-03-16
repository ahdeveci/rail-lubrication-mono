import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDeviceRequest {
  @IsString()
  @IsNotEmpty()
  deviceName: string;

  @IsString()
  @IsNotEmpty()
  macAddress: string;

  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}


