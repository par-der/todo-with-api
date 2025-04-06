import { useEffect, useState } from 'react';

function Feature() {
  const [posts, setPosts] = useState([]); //список постов
  const [error, setError] = useState(null); //HTTP запрос к API

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts.');
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, [setPosts, setError]);

  if (error) return <div className="ease-out">Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col items-center pt-2.5">
        <ul className="w-full max-w-md space-y-2">
          {posts.map((post) => (
            <li
              className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors"
              key={post.id}
            >
              <input type="checkbox" className="mr-3 h-5 w-5 accent-blue-500 cursor-pointer" checked={post.completed} />
              <span className="text-gray-800">{post.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Feature;
