import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../utils/db";

export const TeacherClass = sequelize.define(
	"TeacherClass",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: UUIDV4,
			field: "id",
		},
		teacherId: {
			type: DataTypes.UUID,
			references: {
				model: "teachers", // <<< Note, its table's name, not object name
				key: "id",
			},
			allowNull: false,
		},
		classId: {
			type: DataTypes.UUID,
			references: {
				model: "student_classes", // <<< Note, its table's name, not object name
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
