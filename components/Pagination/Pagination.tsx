// 'use client';

// import ReactPaginateModule from 'react-paginate';
// import type { ComponentType } from 'react';
// import type { ReactPaginateProps } from 'react-paginate';

// import css from './Pagination.module.css';

// type ModuleWithDefault<T> = {
//   default: T;
// };

// const ReactPaginate = (
//   ReactPaginateModule as unknown as ModuleWithDefault<
//     ComponentType<ReactPaginateProps>
//   >
// ).default;

// interface PaginationProps {
//   pageCount: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination = ({
//   pageCount,
//   currentPage,
//   onPageChange,
// }: PaginationProps) => {
//   return (
//     <ReactPaginate
//       pageCount={pageCount}
//       forcePage={currentPage - 1}
//       onPageChange={({ selected }) => onPageChange(selected + 1)}
//       containerClassName={css.pagination}
//       activeClassName={css.active}
//       previousLabel='←'
//       nextLabel='→'
//     />
//   );
// };

// export default Pagination;

'use client';

import ReactPaginate from 'react-paginate';

import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel='←'
      nextLabel='→'
    />
  );
}
