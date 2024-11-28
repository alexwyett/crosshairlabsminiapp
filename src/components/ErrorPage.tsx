import { useEffect } from 'react';

export function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div id="app" className="bg-black text-white flex flex-col items-center justify-center">
      <main className='mx-auto w-full md:w-2/3'>
        <h2 className='uppercase text-center text-pretty'>OOPS!</h2>
        <blockquote>
          <code>
            {error.message}
          </code>
        </blockquote>
        {reset && <button onClick={() => reset()}>Try again</button>}
      </main>
    </div>
  );
}