// 'use client';

// interface ErrorProps {
//   error: Error;
// }

// export default function Error({ error }: ErrorProps) {
//   return <p>Failed to fetch note details. {error.message}</p>;
// }
'use client';

// interface ErrorProps {
//   error: Error;
//   reset: () => void;
// }

// export default function Error({ error, reset }: ErrorProps) {
//   return (
//     <div>
//       <p>Failed to fetch note details. {error.message}</p>

//       <button onClick={reset}>Try again</button>
//     </div>
//   );
// }

'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return <p>Failed to fetch note details. {error.message}</p>;
}
