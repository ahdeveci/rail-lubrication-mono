import { DataSource } from 'typeorm';
import { Container } from 'typedi';
import { connectionOpts } from './config';

const AppDataSource = new DataSource(connectionOpts);
// Initialize database and register repositories
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connection initialized successfully');
    }

    // Register the DataSource in the container
    Container.set('TYPEORM_DATASOURCE', AppDataSource);

const connection = new DataSource(connectionOpts);

    return AppDataSource;
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    throw error;
  }
};

// Export the DataSource for direct use if needed
export default AppDataSource;
