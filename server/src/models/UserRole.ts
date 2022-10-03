import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../utils/db";

export const UserRole = sequelize.define(
	"UserRole",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: UUIDV4,
			field: "id",
		},
		userId: {
			type: DataTypes.UUID,
			references: {
				model: "users", // <<< Note, its table's name, not object name
				key: "id",
			},
			allowNull: false,
		},
		roleId: {
			type: DataTypes.INTEGER,
			references: {
				model: "roles", // <<< Note, its table's name, not object name
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
