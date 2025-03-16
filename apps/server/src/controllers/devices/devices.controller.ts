import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Delete,
  HttpError,
} from 'routing-controllers';
import { CreateDeviceRequest } from './types/createDevice.request';
import { DevicesService } from './devices.service';
import { Service, Inject } from 'typedi';
import { Devices } from '../../database/entity/devices';

@Service()
@JsonController('/devices')
// @Authorized()
export class DevicesController {
  constructor(
    @Inject('devices-service')
    private readonly deviceService: DevicesService
  ) {}

  @Get()
  async getDevices(): Promise<Devices[]> {
    try {
      return await this.deviceService.getDevices();
    } catch (error) {
      console.log(error);
      throw new HttpError(500, 'Failed to fetch devices');
    }
  }

  @Get('/:id')
  async getDevice(@Param('id') id: string): Promise<Devices> {
    try {
      const device = await this.deviceService.getDevice(id);
      if (!device) {
        throw new HttpError(404, `Device with id ${id} not found`);
      }
      return device;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to fetch device');
    }
  }

  @Post()
  async createDevice(@Body() device: CreateDeviceRequest): Promise<Devices> {
    try {
      console.log(device);
      return await this.deviceService.createDevice(device);
    } catch (error) {
      throw new HttpError(500, 'Failed to create device');
    }
  }

  @Put('/:id')
  async updateDevice(
    @Param('id') id: string,
    @Body() device: Partial<CreateDeviceRequest>
  ): Promise<Devices> {
    try {
      return await this.deviceService.updateDevice(id, device);
    } catch (error) {
      throw new HttpError(500, 'Failed to update device');
    }
  }

  @Delete('/:id')
  async deleteDevice(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.deviceService.deleteDevice(id);
    } catch (error) {
      console.log('Error deleting device:', error);
      throw new HttpError(500, 'Failed to delete device');
    }
  }
}
