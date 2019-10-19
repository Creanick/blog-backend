module.exports = result => {
  function formatter(data) {
    return {
      id: data._id,
      title: data.title,
      content: data.content,
      author: data.author,
      createdDate: data.createdDate
    };
  }
  if (!Array.isArray(result)) {
    return formatter(result);
  }
  return result.map(data => formatter(data));
};
