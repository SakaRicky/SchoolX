import {
	DataTypes,
	UUIDV4,
	Model,
	Optional,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyHasAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	HasManySetAssociationsMixin,
} from "sequelize";
import { sequelize } from "../utils/db";
import { SubjectAttributes, TeacherAttributes, UserAttributes } from "../types";

export interface TeachertCreationAttributes
	extends Optional<TeacherAttributes, "id"> {}

// We recommend you declare an interface for the attributes, for stricter typechecking
interface TeacherInstance
	extends Model<TeacherAttributes, TeachertCreationAttributes> {
	subjectIds?: number[];
	studentClassId?: number;

	getUser: HasManyGetAssociationsMixin<UserAttributes>;
	getSubjects: HasManyGetAssociationsMixin<SubjectAttributes>;
	addSubject: HasManyAddAssociationMixin<SubjectAttributes, number>;
	addSubjects: HasManyAddAssociationsMixin<SubjectAttributes, number>;
	setSubjects: HasManySetAssociationsMixin<SubjectAttributes, number>;
	removeSubject: HasManyRemoveAssociationMixin<SubjectAttributes, number>;
	removeSubjects: HasManyRemoveAssociationsMixin<SubjectAttributes, number>;
	hasSubject: HasManyHasAssociationMixin<SubjectAttributes, number>;
	hasSubjects: HasManyHasAssociationsMixin<SubjectAttributes, number>;
	countSubjects: HasManyCountAssociationsMixin;
}

export const Teacher = sequelize.define<TeacherInstance>(
	"teacher",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		userId: {
			type: DataTypes.UUID,
			references: {
				model: "users",
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
