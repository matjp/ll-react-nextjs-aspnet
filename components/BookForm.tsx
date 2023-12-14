

import { Dispatch, SetStateAction } from "react";

interface BookFormProps {
  formName: string;
  formValue: string;
  disabled: boolean;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export default function BookForm( { formName, formValue, disabled, reload, setReload } : BookFormProps ) {

  function updateBook() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`http://localhost:7094/books/${formName}/${formValue}`, requestOptions).then(() => {
        setReload(!reload);
      });
  }

  return (
    <>
      <div className="p-2 flex justify-center">
        <button name='submit' aria-label='submit' onClick={updateBook} disabled={disabled}
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded items-center">{formName[0].toUpperCase() + formName.slice(1).toLowerCase()}</button>
      </div>
    </>
  )
}