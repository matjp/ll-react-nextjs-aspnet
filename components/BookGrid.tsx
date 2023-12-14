'use client'

import Book from '../model/Book';
import BookItem from './BookItem';
import { useState, useEffect } from 'react';

interface BookGridProps {
  formName: string;
}

export default function BookGrid( { formName } : BookGridProps ) {

  const [books, setBooks] = useState<Book[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const borrowed = formName === 'return' ? 1 : 0;

  useEffect(() => {
    async function getBooks(borrowed: Number) {
      const res = await fetch(`http://localhost:7094/books/${borrowed}`)
      if (!res.ok) {
        throw new Error('Failed to fetch Books data')
      }
      if (!ignore) {
        return res.json();
      }
    }
    let ignore = false;
    getBooks(borrowed).then(res => setBooks(res));
    return () => {
      ignore = true;
    }
  }, [borrowed, reload]);

  return(
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 p-4 gap-4 font-sans place-items-center text-lg font-bold text-white">
        { books?.map((book: Book) => {
          return (
            <div key={book.title}>
              <BookItem book={book} formName={formName} reload={reload} setReload={setReload}></BookItem>
            </div>
          )
        })}
      </div>
    </>
  )

}