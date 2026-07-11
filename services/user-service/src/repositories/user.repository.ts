import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

  findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id
      }
    });
  };

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
      }
    });
  };

  saveUser(user: Partial<User>) {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }
}
