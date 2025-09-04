
export const getPagination = (page = 1, limit = 10) => {
  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  const skip = (parsedPage - 1) * parsedLimit;
  const take = parsedLimit;

  return { skip, take, page: parsedPage, limit: parsedLimit };
};

export const getPaginationResponse = (data, totalItems, page, limit) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    page,
    limit,
    totalItems,
    totalPages,
    data,
  };
};