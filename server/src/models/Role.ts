import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";
import { RoleAttributes } from "../types";

export interface RoletInput extends Optional<RoleAttributes, "id"> {}

// We recommend you declare an interface for the attributes, for stricter typechecking
interface RoleInstance extends Model<RoletInput, RoletInput> {}

export const Role = sequelize.define<RoleInstance>(
	"role",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		code: {
			type: DataTypes.STRING,
			allowNull: true, // allowNull defaults to true
		},
	},
	{
		// Other model options go here
		underscored: true,
		// freezeTableName: true,
	}
);
