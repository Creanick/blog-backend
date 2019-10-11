module.exports = result => {
  return {
    id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
    createdDate: result.createdDate
  };
};
