import knex from "knex";
import { IdGenerator } from "../services/IdGenerator";
import {HashManager} from '../services/HashManager';

export class UserDatabase {
  private connection = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_nAME,
    },
  });

  private static TABLE_NAME = "User";

  public async createUser(
    id: string,
    email: string,
    password: string,
    role?: string,
  ): Promise<any> {

    await this.connection
      .insert({
        id,
        email,
        password,
        role
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async fetchUserInfo(email: string): Promise<any> {
    if (!email || email.indexOf("@") === -1) {
      throw new Error("Confira o email");
    }

    const result = await this.connection
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }

  public async fetchUserById(id: string): Promise<any> {
    const result = await this.connection
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }


  public async deleteUser(id: string): Promise<any> {
    await this.connection
    .delete()
    .from(UserDatabase.TABLE_NAME)
    .where({id})
    console.log("Usuário deletado")
  }
}


