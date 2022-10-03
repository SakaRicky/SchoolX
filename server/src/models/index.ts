import { Student } from "./Student";
import { StudentClass } from "./StudentClass";
import { Subject } from "./Subject";
import { Sequence } from "./Sequence";
import { Mark } from "./Mark";
import { Teacher } from "./Teacher";
import { User } from "./User";
import { Role } from "./Role";
import { TeacherSubject } from "./TeacherSubject";
import { TeacherClass } from "./TeacherClass";
import { SubjectClass } from "./SubjectClass";
import { UserRole } from "./UserRole";
// import { sequelize } from "../utils/db";

// TODO: many to many between student and subjects

StudentClass.hasMany(Student);

Student.belongsTo(StudentClass);

Subject.belongsToMany(StudentClass, {
	through: SubjectClass,
});

StudentClass.belongsToMany(Subject, {
	through: SubjectClass,
});

Student.hasMany(Mark, {
	foreignKey: {
		allowNull: false,
	},
});

Mark.belongsTo(Student, {
	foreignKey: {
		allowNull: false,
	},
});

Subject.hasOne(Mark, {
	foreignKey: {
		allowNull: false,
	},
	constraints: false,
});

Mark.belongsTo(Subject, {
	foreignKey: {
		allowNull: false,
	},
});

Sequence.hasMany(Mark, {
	foreignKey: {
		allowNull: false,
	},
});

Mark.belongsTo(Sequence, {
	foreignKey: {
		allowNull: false,
	},
});

Teacher.belongsToMany(Subject, {
	through: TeacherSubject,
});

Subject.belongsToMany(Teacher, {
	through: TeacherSubject,
});

StudentClass.belongsToMany(Teacher, {
	through: TeacherClass,
});

Teacher.belongsToMany(StudentClass, {
	through: TeacherClass,
});

User.belongsToMany(Role, {
	through: UserRole,
});

Role.belongsToMany(User, {
	through: UserRole,
});

User.hasOne(Teacher, {
	foreignKey: {
		allowNull: true,
	},
});

Teacher.belongsTo(User, {
	foreignKey: {
		allowNull: false,
	},
});

// void sequelize.sync({ alter: true });

// void Student.sync({ alter: true });
// void StudentClass.sync({ alter: true });
// void Sequence.sync({ alter: true });
// void Mark.sync({ alter: true });
// void Subject.sync({ alter: true });
// void User.sync({ alter: true });
// void Role.sync({ alter: true });
// void Teacher.sync({ alter: true });

// // create the sequences in the table
// const initSequnesnces = async () => {
// 	for (let index = 1; index < 7; index++) {
// 		await Sequence.create({ name: `Sequence ${index}` });
// 	}
// };
// //create the sequences in the table
// const initSubjects = () => {
// 	const subjects = [
// 		{ code: "math", name: "Mathematics" },
// 		{ code: "eng", name: "English" },
// 		{ code: "fre", name: "French" },
// 	];
// 	subjects.forEach(async subj => {
// 		await Subject.create({ name: subj.name, code: subj.code });
// 	});
// };

// const initStudentClasses = () => {
// 	const subjects = [
// 		{
// 			className: "Form 1",
// 			classCode: "f1",
// 		},
// 		{
// 			className: "Form 2",
// 			classCode: "f2",
// 		},
// 		{
// 			className: "Form 3",
// 			classCode: "f3",
// 		},
// 		{
// 			className: "Form 4",
// 			classCode: "f4",
// 		},
// 		{
// 			className: "Form 5",
// 			classCode: "f5",
// 		},
// 	];
// 	subjects.forEach(async studentclass => {
// 		await StudentClass.create({
// 			className: studentclass.className,
// 			classCode: studentclass.classCode,
// 		});
// 	});
// };

// // create the sequences in the table
// const initRoles = () => {
// 	const roles = [
// 		{ code: "P", name: "Principal" },
// 		{ code: "VP", name: "Vice Principal" },
// 		{ code: "T", name: "Teacher" },
// 	];
// 	roles.forEach(async subj => {
// 		await Role.create({ name: subj.name, code: subj.code });
// 	});
// };

// void initSequnesnces();
// void initSubjects();
// initStudentClasses();
// initRoles();

const models = {
	Student,
	StudentClass,
	Subject,
	Sequence,
	Mark,
	User,
	Role,
	Teacher,
};

export default models;
