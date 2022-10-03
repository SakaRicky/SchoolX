import {
	DataTypes,
	UUIDV4,
	Model,
	Optional,
	CreationOptional,
	HasManyAddAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyHasAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	HasManySetAssociationsMixin,
} from "sequelize";
import { sequelize } from "../utils/db";
import { RoleAttributes, UserAttributes } from "../types";

export interface UserCreationAttributes
	extends Optional<UserAttributes, "id" | "roles"> {}

// We recommend you declare an interface for the attributes, for stricter typechecking
interface UserInstance extends Model<UserAttributes, UserCreationAttributes> {
	id: CreationOptional<string>;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	gender: string;
	email?: string;
	phone: number | string;
	passwordHash: string;

	getRoles: HasManyGetAssociationsMixin<RoleAttributes>;
	addRoles: HasManyAddAssociationMixin<RoleAttributes, number>;
	setRoles: HasManySetAssociationsMixin<RoleAttributes, number>;
	removeRole: HasManyRemoveAssociationMixin<RoleAttributes, number>;
	removeRoles: HasManyRemoveAssociationsMixin<RoleAttributes, number>;
	hasRole: HasManyHasAssociationMixin<RoleAttributes, number>;
	hasRoles: HasManyHasAssociationsMixin<RoleAttributes, number>;
	countRoles: HasManyCountAssociationsMixin;
}

export const User = sequelize.define<UserInstance>(
	"user",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true, // allowNull defaults to true
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING(7),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		passwordHash: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
	},
	{
		// Other model options go here
		underscored: true,
		// freezeTableName: true,
	}
);
