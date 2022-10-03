import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../utils/db";

export const TeacherSubject = sequelize.define(
	"TeacherSubject",
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
				model: "teachers",
				key: "id",
			},
		},
		subjectId: {
			type: DataTypes.INTEGER,
			references: {
				model: "subjects",
				key: "id",
			},
		},
	},
	{
		// Other model options go here
		underscored: true,
		// freezeTableName: true,
	}
);
