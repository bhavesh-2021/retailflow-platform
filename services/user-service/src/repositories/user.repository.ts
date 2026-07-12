import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { Not, Repository } from "typeorm";
import { UserStatus } from "../common/enums";

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

  findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
        status: Not(UserStatus.SUSPENDED),
      }
    });
  };

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
        status: Not(UserStatus.SUSPENDED),
      }
    });
  };

  saveUser(user: Partial<User>) {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }
}
