import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserStatus } from "../common/enums";

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    length: 255,
  })
  email!: string

  @Column()
  password!: string;

  @Column({
    name: "first_name",
    length: 100,
  })
  firstName!: string;

  @Column({
    name: "last_name",
    length: 100
  })
  lastName!: string;

  @Column({
    name: "phone_number",
    length: 20,
    nullable: true,
    unique: true,
  })
  phoneNumber?: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status!: UserStatus;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;
}
