import { req } from "../axios.config";

export const getPosts = {
  all: async () => {
    const res = await req.get("/posts");
    return res.data;
  },
  byId: async (id) => {
    const res = await req.get(`/posts/${id}`);
    return res.data;
  }
};
