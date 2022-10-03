import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../utils/db";
import { StudentClassAttributes } from "types";

export interface StudentClassInput
	extends Optional<StudentClassAttributes, "id"> {}

interface StudentClassInstance
	extends Model<StudentClassAttributes, StudentClassInput> {}

export const StudentClass = sequelize.define<StudentClassInstance>(
	"student_class",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: UUIDV4,
			field: "id",
		},
		classCode: {
			type: DataTypes.STRING,
			allowNull: false, // allowNull defaults to true
		},
		className: {
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
