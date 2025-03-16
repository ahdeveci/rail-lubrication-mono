import { Service, Inject } from 'typedi';
import { Devices } from '../../database/entity/devices';
import { CreateDeviceRequest } from './types/createDevice.request';

import { NotFoundError } from '../../errors/not-found.error';
import { DeviceRepository } from '../../database/database.service';

@Service('devices-service')
export class DevicesService {
  constructor(
    @Inject('device-repository')
    private readonly deviceRepository: DeviceRepository
  ) {}

  async createDevice(device: CreateDeviceRequest): Promise<Devices> {
    try {
      const newDevice = new Devices(device);
      return await this.deviceRepository.save(newDevice);
    } catch (error) {
      throw new Error(`Failed to create device: ${error.message}`);
    }
  }

  async getDevices(): Promise<Devices[]> {
    try {
      return await this.deviceRepository.find();
    } catch (error) {
      throw new Error(`Failed to fetch devices: ${error.message}`);
    }
  }

  async getDevice(id: string): Promise<Devices> {
    try {
      const device = await this.deviceRepository.findOne({ where: { id } });
      if (!device) {
        throw new NotFoundError(`Device with id ${id} not found`);
      }
      return device;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to fetch device: ${error.message}`);
    }
  }

  async updateDevice(
    id: string,
    device: Partial<CreateDeviceRequest>
  ): Promise<Devices> {
    try {
      const existingDevice = await this.getDevice(id);
      Object.assign(existingDevice, device);
      return await this.deviceRepository.save(existingDevice);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to update device: ${error.message}`);
    }
  }

  async deleteDevice(id: string): Promise<boolean> {
    try {
      const device = await this.getDevice(id);
      await this.deviceRepository.remove(device);
      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        return false;
      }
      throw new Error(`Failed to delete device: ${error.message}`);
    }
  }
}
