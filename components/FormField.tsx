import React from "react";
// import { TextField } from "@material-ui/core";
// import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
// import { Gender } from "types";

// // structure of a single gender option
// export type GenderOption = {
//   value: Gender;
//   label: string;
// };

// // props for select field component
// type SelectFieldProps = {
//   name: string;
//   label: string;
//   options: GenderOption[];
// };

// export const SelectField = ({
//   name,
//   label,
//   options
// }: SelectFieldProps) => (
//   <Form.Field>
//     <label>{label}</label>
//     <Field as="select" name={name} className="ui dropdown">
//       {options.map(option => (
//         <option key={option.value} value={option.value}>
//           {option.label || option.value}
//         </option>
//       ))}
//     </Field>
//   </Form.Field>
// );

// // props for the text field
// interface TextProps extends FieldProps {
//     label: string;
//     type: string;
// }
  
// export const MyTextField= ({
//     field,
//     label,
//     type,
//   }: TextProps) => (
//     <TextField
//         label={label}
//         type={type}
        
//   />
//     // <TextField>
//     //   <label>{label}</label>
//     //   <Field placeholder={placeholder} {...field} />
//     //   <div style={{ color:'red' }}>
//     //     <ErrorMessage name={field.name} />
//     //   </div>
//     // </TextField>
// );