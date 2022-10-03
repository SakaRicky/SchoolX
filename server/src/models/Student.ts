import {
	CreationOptional,
	DataTypes,
	Model,
	Optional,
	UUIDV4,
} from "sequelize";
import { sequelize } from "../utils/db";
import { StudentAttributes } from "../types";

// // 'projects' is excluded as it's not an attribute, it's an association.
// class Student extends Model<InferAttributes<Student, { omit: 'projects' }>, InferCreationAttributes<Student, { omit: 'projects' }>> {
// 	// id can be undefined during creation when using `autoIncrement`
// 	declare id: CreationOptional<number>;
// 	declare firstName: string;
// 	declare lastName: string | null; // for nullable fields
// 	declare dateOfBirth: string;
// 	declare gender: string;
// 	declare fathersName: string;
// 	declare fathersPhone: string;
// 	declare fathersOccupation: string;
// 	declare mothersName: string;
// 	declare mothersOccupation: string;
// 	declare mothersPhone: string;
// 	// foreign keys are automatically added by associations methods (like Project.belongsTo)
//   // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
//   // display an error if ownerId is missing.
//   declare studentClassId: ForeignKey<typeof StudentClass['id']>;

// 	// timestamps!
// 	// createdAt can be undefined during creation
// 	declare createdAt: CreationOptional<Date>;
// 	// updatedAt can be undefined during creation
// 	declare updatedAt: CreationOptional<Date>;

// 	// Since TS cannot determine model association at compile time
// 	// we have to declare them here purely virtually
// 	// these will not exist until `Model.init` was called.
// 	// declare getProjects: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
// 	// declare addProject: HasManyAddAssociationMixin<Project, number>;
// 	// declare addProjects: HasManyAddAssociationsMixin<Project, number>;
// 	// declare setProjects: HasManySetAssociationsMixin<Project, number>;
// 	// declare removeProject: HasManyRemoveAssociationMixin<Project, number>;
// 	// declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>;
// 	// declare hasProject: HasManyHasAssociationMixin<Project, number>;
// 	// declare hasProjects: HasManyHasAssociationsMixin<Project, number>;
// 	// declare countProjects: HasManyCountAssociationsMixin;
// 	// declare createProject: HasManyCreateAssociationMixin<Project, 'ownerId'>;

// 	// getters that are not attributes should be tagged using NonAttribute
// 	// to remove them from the model's Attribute Typings.
// 	get fullName(): NonAttribute<string> {
// 		return this.firstName + this.lastName;
// 	}

// 	// declare static associations: {
// 	// 	projects: Association<Student, StudentClass>;
// 	// };
//   }

type StudentCreationAttributes = Optional<StudentAttributes, "id">;

// We recommend you declare an interface for the attributes, for stricter typechecking
interface StudentInstance
	extends Model<StudentAttributes, StudentCreationAttributes> {
	id: CreationOptional<number>;
	firstName: string;
	lastName: string | null; // for nullable fields
	dateOfBirth: string;
	gender: string;
	fathersName: string;
	fathersPhone: string;
	fathersOccupation: string;
	mothersName: string;
	mothersOccupation: string;
	mothersPhone: string;
}

export const Student = sequelize.define<StudentInstance>(
	"student",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false, // allowNull defaults to true
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING(7),
			allowNull: false,
		},
		fathersName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		fathersPhone: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		fathersOccupation: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		mothersName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		mothersPhone: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		mothersOccupation: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		studentClassId: {
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
