import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  //Database Type
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  //Entities to be loaded for this connection
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //Indicates if adatabase schema should be auto create
  //Be careful with this option and don't use this
  // - otherwise you can lose production data.
  //This option is useful during debug and development
  synchronize: true,
};
