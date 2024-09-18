import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./service/posts";

const App = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts.all(),
  });
  const byIdPosts = useQuery({
    queryKey: ["posts/by/id"],
    queryFn: () => getPosts.byId(6),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto">
      <div className="card">
        {byIdPosts.isPending && <span>ID Loading...</span>}
      </div>
      <div className="card">
        {byIdPosts.isError && <span>ID Error: {byIdPosts.error.message}</span>}
      </div>

      <div className="card border-indigo-300 border-2 rounded-sm mb-10 p-2">
        {JSON.stringify(byIdPosts.data)}
      </div>

      <ul>
        {data.map((post) => (
          <>
            <li
              className="border-indigo-300 border-b-2 rounded-sm mb-2 p-2"
              key={post.id}
            >
              <h3 className="text-[20px] text-blue-500 font-bold">
                {post.id}:{" "}
                {post.title.slice(0, 1).toUpperCase() + post.title.slice(1)}
              </h3>
              <p>{post.body}</p>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default App;
