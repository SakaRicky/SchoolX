import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";
import { SubjectAttributes } from "types";

export interface SubjectInput extends Optional<SubjectAttributes, "id"> {}

interface SubjectInstance extends Model<SubjectAttributes, SubjectInput> {}

export const Subject = sequelize.define<SubjectInstance>(
	"subject",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: "id",
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false, // allowNull defaults to true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		underscored: true,
		// freezeTableName: true,
	}
);
