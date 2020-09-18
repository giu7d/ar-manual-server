import { createConnection, getConnectionOptions } from "typeorm";

export class TypeORM {
  static async connect() {
    try {
      const connectionOptions = await getConnectionOptions();

      await createConnection(connectionOptions);

      console.log(
        `> TypeORM: \x1b[32mPostgres is connected successfully!\x1b[39m`
      );
    } catch (error) {
      console.warn(
        `> TypeORM: \x1b[31mA error appeared while connecting with the db\x1b[39m, check the error below:\n\t${error}`
      );
    }
  }
}
