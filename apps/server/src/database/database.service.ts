import { DataSource, Repository } from 'typeorm';
import { Container, Service } from 'typedi';
import { connectionOpts } from './config';
import { Devices } from './entity/devices';
import { DevicesController } from '../controllers/devices/devices.controller';
import { DevicesService } from '../controllers/devices/devices.service';

// Create and export the DataSource instance
const AppDataSource = new DataSource(connectionOpts);

// Create a custom repository for Devices
@Service('device-repository')
export class DeviceRepository extends Repository<Devices> {
  constructor() {
    super(Devices, AppDataSource.createEntityManager());
  }
}

// Initialize database and register repositories
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connection initialized successfully');
    }

    // Register the DataSource in the container
    Container.set('TYPEORM_DATASOURCE', AppDataSource);

    // Register the DeviceRepository
    Container.set(
      DevicesController,
      new DevicesController(new DevicesService(new DeviceRepository()))
    );

    return AppDataSource;
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    throw error;
  }
};

// Export the DataSource for direct use if needed
export default AppDataSource;
