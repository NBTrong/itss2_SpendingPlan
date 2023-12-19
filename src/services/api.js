import publicApi from "./config/publicApi.config";

export const getIncomes = (data) =>
  publicApi({
    method: 'POST',
    url: '/income',
    data,
  });

export const addIncome = (data) =>
  publicApi({
    method: 'POST',
    url: '/income/create',
    data,
  });

export const updateIncome = (data) =>
  publicApi({
    method: 'PATCH',
    url: '/income/update',
    data,
  });

export const deleteIncome = (data) =>
  publicApi({
    method: 'DELETE',
    url: '/income/delete',
    data,
  });

export const getExpenses = (data) =>
  publicApi({
    method: 'POST',
    url: '/expense',
    data,
  });

export const addExpense = (data) =>
  publicApi({
    method: 'POST',
    url: '/expense/create',
    data,
  });

export const updateExpense = (data) =>
  publicApi({
    method: 'PATCH',
    url: '/expense/update',
    data,
  });

export const deleteExpense = (data) =>
  publicApi({
    method: 'DELETE',
    url: '/expense/delete',
    data,
  });

export const getCategories = (data) =>
  publicApi({
    method: 'POST',
    url: '/category',
    data,
  })

export const addPlan = (data) =>
  publicApi({
    method: 'POST',
    url: '/category/update',
    data,
  });