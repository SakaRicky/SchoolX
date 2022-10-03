import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export const SubjectClass = sequelize.define(
	"SubjectClass",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: "id",
		},
		classId: {
			type: DataTypes.UUID,
			references: {
				model: "student_classes", // <<< Note, its table's name, not object name
				key: "id",
			},
			allowNull: false,
		},
		subjectId: {
			type: DataTypes.INTEGER,
			references: {
				model: "subjects", // <<< Note, its table's name, not object name
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
