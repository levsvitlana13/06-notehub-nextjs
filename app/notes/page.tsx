// import { useState } from 'react';
// import { useDebounce } from 'use-debounce';
// import { useQuery } from '@tanstack/react-query';

// import { fetchNotes } from '../../services/noteService';

// import NoteList from '../NoteList/NoteList';
// import SearchBox from '../SearchBox/SearchBox';
// import NoteForm from '../NoteForm/NoteForm';
// import Pagination from '../Pagination/Pagination';
// import Modal from '../Modal/Modal';
// import { keepPreviousData } from '@tanstack/react-query';

// import css from './App.module.css';

// const App = () => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [debouncedSearch] = useDebounce(search, 300);

//   const { data, isLoading, isFetching, error } = useQuery({
//     queryKey: ['notes', page, debouncedSearch],
//     queryFn: () =>
//       fetchNotes({
//         page,
//         search: debouncedSearch,
//       }),
//     placeholderData: keepPreviousData,
//   });

//   if (error) {
//     return <p>Error!</p>;
//   }

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <h1>NoteHub</h1>

//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>

//         <SearchBox
//           value={search}
//           onSearch={value => {
//             setSearch(value);
//             setPage(1);
//           }}
//         />
//       </header>

//       {(isLoading || isFetching) && <p>Loading...</p>}

//       {data && <NoteList notes={data.notes} />}

//       {data && data.totalPages > 1 && (
//         <Pagination
//           pageCount={data.totalPages}
//           currentPage={page}
//           onPageChange={setPage}
//         />
//       )}

//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onClose={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default App;
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: '',
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
