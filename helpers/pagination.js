module.exports = (objectPagination, query, countRooms) => {
  if(query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  const totalPage = Math.ceil(countRooms / objectPagination.limitItems);

  objectPagination.totalPage = totalPage;

  return objectPagination

}