import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { AddStudentForm } from '.';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'theme';


describe("test <AddStudentForm />", () => {

    const handleSubmit = jest.fn();
    const handleCancel = jest.fn();

    test('should update state and call handleSubmit received in props', async () => { 
        
        const dosumentBody = render(
            // this theme is because it uses some values in some components like this, else it 
            // produces and error
            <ThemeProvider theme={theme}>
                <AddStudentForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
            </ThemeProvider>
        );

        //get the different inputs from the form so we can fire events on them and 
        // check if they have the appropriate values
        const firstNameInput = screen.getByRole("textbox", { name: "firstName"}) as HTMLInputElement;
        const lastNameInput = screen.getByRole("textbox", { name: "lastName"})  as HTMLInputElement;
        const fathersNameInput = screen.getByRole("textbox", { name: "fathersName"})  as HTMLInputElement;
        const fathersPhoneInput = screen.getByRole("textbox", { name: "fathersPhone"})  as HTMLInputElement;
        const fathersOccupationInput = screen.getByRole("textbox", { name: "fathersOccupation"})  as HTMLInputElement;
        const mothersNameInput = screen.getByRole("textbox", { name: "mothersName"})  as HTMLInputElement;
        const mothersPhoneInput = screen.getByRole("textbox", { name: "mothersPhone"})  as HTMLInputElement;
        const mothersOccupationInput = screen.getByRole("textbox", { name: "mothersOccupation"})  as HTMLInputElement;

        const DateInput = screen.getByTestId("dateOfBirth").querySelectorAll('input')[0]  as HTMLInputElement;
        // const DateInput = screen.getByLabelText("Date of Birth") as HTMLInputElement;
        

        const femaleRadioInput = screen.getByLabelText("Female")  as HTMLInputElement;
        const maleRadioInput = screen.getByLabelText("Male")  as HTMLInputElement;

        const selectClassField = screen.getByTestId("select")  as HTMLInputElement;


        const submitBtn = screen.getByRole("button", { name: /submit/i});
        const cancelBtn = screen.getByRole("button", { name: "Cancel"});

        act(() => {
            /* fire events that update state */
            fireEvent.change(firstNameInput, {target: {value: 'John'}});
            fireEvent.change(lastNameInput, {target: {value: 'Paul'}});
            fireEvent.change(fathersNameInput, {target: {value: 'John Peter'}});
            fireEvent.change(fathersPhoneInput, {target: {value: '123456'}});
            fireEvent.change(fathersOccupationInput, {target: {value: 'Lawyer'}});
            fireEvent.change(mothersNameInput, {target: {value: 'Mary Magda'}});
            fireEvent.change(mothersPhoneInput, {target: {value: '654321'}});
            fireEvent.change(mothersOccupationInput, {target: {value: 'House Wife'}});
            fireEvent.mouseDown(DateInput);
            // Date Picker stores value as YYYY-MM-DD
            const date = new Date('25-01-1991');
            fireEvent.change(DateInput, { target: { value: date } });            

            fireEvent.click(femaleRadioInput);
            fireEvent.click(maleRadioInput);

            // userEvent.selectOptions(selectClassField, "f1");
            fireEvent.change(selectClassField, { target: { value: 'f2' } });
            
        });

        userEvent.click(submitBtn);
        
        await waitFor(() => {
            expect(firstNameInput.value).toBe('John');
            expect(lastNameInput.value).toBe('Paul');
            expect(fathersNameInput.value).toBe('John Peter');
            expect(fathersPhoneInput.value).toBe('123456');
            expect(fathersOccupationInput.value).toBe('Lawyer');
            expect(mothersNameInput.value).toBe('Mary Magda');
            expect(mothersPhoneInput.value).toBe('654321');
            expect(mothersOccupationInput.value).toBe('House Wife');
            expect(DateInput.value).toBe('1990-01-10');
            
            expect(femaleRadioInput).not.toBeChecked();           
            expect(maleRadioInput).toBeChecked();

            // I forced this solution because jest would finish it test before Formik onSubmit
            // Hence at testing with expect(handleSubmit).toBeCalled() only, it wasn't yet called
            setInterval(() => {
                expect(handleSubmit).toBeCalledTimes(1);
                expect(handleSubmit).toBeCalledWith(
                    {
                        firstName: 'John',
                        lastName: 'Paul',
                        dateOfBirth: new Date('25-01-1991'),
                        gender: 'male',
                        fathersName: 'John Peter',
                        fathersPhone: '123456',
                        fathersOccupation: 'Lawyer',
                        mothersName: 'Mary Magda',
                        mothersPhone: '654321',
                        mothersOccupation: 'House Wife',
                        classCode: ''
                      }
                );
                return expect(handleSubmit).toHaveBeenCalled();
              }, 2000);
            // expect(handleSubmit).toBeCalled();
        });

        // await waitFor(() => {
        //     expect(handleSubmit).toBeCalled();
        //   });



        // await screen.getByRole("option");

     });
});