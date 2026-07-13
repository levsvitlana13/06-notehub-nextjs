'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';

import css from './NotesPage.module.css';

const NotesClient = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <h1>NoteHub</h1>

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>

        <SearchBox
          value={search}
          onSearch={value => {
            setSearch(value);
            setPage(1);
          }}
        />
      </header>

      {(isLoading || isFetching) && <p>Loading...</p>}

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
