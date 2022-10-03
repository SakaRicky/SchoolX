import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../utils/db";
import { MarkAttributes } from "../types";

export interface MarksInput extends Optional<MarkAttributes, "id"> {}

// We recommend you declare an interface for the attributes, for stricter typechecking
interface MarkInstance extends Model<MarkAttributes, MarksInput> {}

export const Mark = sequelize.define<MarkInstance>(
	"mark",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		value: {
			type: DataTypes.INTEGER,
		},
		sequenceId: {
			type: DataTypes.INTEGER,
			references: {
				model: "sequences",
				key: "id",
			},
			allowNull: false,
		},
		studentId: {
			type: DataTypes.UUID,
			references: {
				model: "students",
				key: "id",
			},
			allowNull: false,
		},
		subjectId: {
			type: DataTypes.INTEGER,
			references: {
				model: "subjects",
				key: "id",
			},
			allowNull: false,
		},
	},
	{
		// Other model options go here
		underscored: true,
		// freezeTableName: true,
	}
);
