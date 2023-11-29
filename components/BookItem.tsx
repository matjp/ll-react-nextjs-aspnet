import Book from '../model/Book';
import Image from 'next/image'
import BookForm from './BookForm';
import { Dispatch, SetStateAction } from "react";

interface BookProps {
  book: Book;
  formName: string;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export default function BookItem( { book, formName, reload, setReload } : BookProps ) {
  return (
    <>
      <div className="p-2 flex justify-center">
        <Image className="items-center"
          src={`data:image/avif;base64,${book.cover_image}`}
          width="242"
          height="363"
          alt={book.title}
        />
      </div>
      <div className="p-2 text-center">{book.title}</div>
      <div className="p-2 text-center">{book.author}</div>
      <BookForm formName={formName} formValue={book.title} disabled={formName === 'borrow' ? book.borrowed : !book.borrowed} reload={reload} setReload={setReload}></BookForm>
    </>
  )
}