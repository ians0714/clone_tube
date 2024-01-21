const videos = [
  {
    title: "1",
    rating: 5,
    comments: 2,
    createdAt: "few minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "2",
    rating: 5,
    comments: 2,
    createdAt: "few minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "3",
    rating: 5,
    comments: 2,
    createdAt: "few minutes ago",
    views: 59,
    id: 3,
  },
  {
    title: "4",
    rating: 5,
    comments: 2,
    createdAt: "few minutes ago",
    views: 59,
    id: 4,
  },
];
export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watch ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[0].title = title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload");
};
export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 5,
    comments: 2,
    createdAt: "few minutes ago",
    views: 59,
    id: 4,
  };
  videos.push(newVideo);
  return res.redirect(`/`, { pageTitle: `Upload Video` });
};
export const search = (req, res) => res.send("Videos");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload Video");
