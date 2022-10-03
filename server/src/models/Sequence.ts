import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";
import { SequenceAttributes } from "../types";

export interface SequenceInput extends Optional<SequenceAttributes, "id"> {}

// We recommend you declare an interface for the attributes, for stricter typechecking
interface SequenceInstance extends Model<SequenceAttributes, SequenceInput> {}

export const Sequence = sequelize.define<SequenceInstance>(
	"sequence",
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
	},
	{
		// Other model options go here
		underscored: true,
		// freezeTableName: true,
	}
);
