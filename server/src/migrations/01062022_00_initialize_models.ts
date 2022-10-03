// import { QueryInterface, DataTypes, UUIDV4 } from "sequelize/types";

// export const migrate = {
//     up: async (queryInterface: QueryInterface) => {
//       await queryInterface.createTable('students', {
//         id: {
//           type: DataTypes.UUID,
//           allowNull: false,
//           primaryKey: true,
//           defaultValue: UUIDV4,
//         },
//         firstName: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         lastName: {
//           type: DataTypes.STRING,
//           allowNull: false, // allowNull defaults to true
//         },
//         dateOfBirth: {
//           type: DataTypes.DATE,
//           allowNull: false,
//         },
//         gender: {
//           type: DataTypes.STRING(7),
//           allowNull: false,
//         },
//         fathersName: {
//           type: DataTypes.STRING(50),
//           allowNull: false,
//         },
//         fathersPhone: {
//           type: DataTypes.STRING(20),
//           allowNull: false,
//         },
//         fathersOccupation: {
//           type: DataTypes.STRING(50),
//           allowNull: false,
//         },
//         mothersName: {
//           type: DataTypes.STRING(50),
//           allowNull: false,
//         },
//         mothersPhone: {
//           type: DataTypes.STRING(20),
//           allowNull: false,
//         },
//         mothersOccupation: {
//           type: DataTypes.STRING(50),
//           allowNull: false,
//         },
//         studentClassId: {
//           type: DataTypes.UUID,
//           references: {
//             model: "student_classes", // <<< Note, its table's name, not object name
//             key: "id",
//           },
//           allowNull: false,
//         },
//       });
//       await queryInterface.createTable('subjects', {
//         id: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//           primaryKey: true,
//           autoIncrement: true,
//           field: "id",
//         },
//         code: {
//           type: DataTypes.STRING,
//           allowNull: false, // allowNull defaults to true
//         },
//         name: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//       });
//       await queryInterface.addColumn('notes', 'user_id', {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { model: 'users', key: 'id' },
//       });
//     },
//     down: async (queryInterface: QueryInterface) => {
//       await queryInterface.dropTable('notes');
//       await queryInterface.dropTable('users');
//     },
//   };
