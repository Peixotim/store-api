import { DataTypes, Model } from 'sequelize';
import type { UsersAttributes, UsersCreate } from '../dtos/user-dto';
import sequelize from '../config/sequelize';

class User extends Model<UsersAttributes, UsersCreate> implements UsersAttributes {
  public id!: string;
  public name!: string;
  public cpf!: string;
  public password!: string;
  public zipcode!: string;
  public email!: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [11, 14],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

export default User;
