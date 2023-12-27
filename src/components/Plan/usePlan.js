import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userKeyAtom from '../../storage/userKeyAtom';
import {
  useRecoilState
} from 'recoil'

import {
  getExpenses,
  addPlan,
  getCategories,
  deleteExpense
} from '../../services/api';

export default function usePlan() {
  const queryClient = useQueryClient()

  const currentTime = (new Date()).toISOString();

  const currentMonth = ((new Date()).getMonth() + 1).toString().padStart(2, '0')

  const [userKey] = useRecoilState(userKeyAtom);

  // ----------------------------------- Get list incomes ----------------------------------------
  const listExpensesTransform = useCallback((data) => {
    return data ? data.map((item) => ({
      id: item?.id,
      amount: item?.amount,
      note: item?.note,
      time: item?.time,
      userKey: item?.user_key,
      categoryId: item?.category_id,
      createdAt: item?.created_at,
      updatedAt: item?.updated_at,
      category: {
        id: item?.category?.id,
        name: item?.category?.name,
        color: item?.category?.color,
        icon: item?.category?.icon,
        status: item?.category?.status,
        amount: item?.category?.amount
      },
    })) : []
  }, []);

  const { data, isSuccess } = useQuery({
    queryKey: ['spending', currentMonth],
    queryFn: () => getExpenses({
      userKey,
      time: currentTime
    }),
    enabled: !!userKey,
    select: (data) =>
      listExpensesTransform(data.data.data),
    retry: 3,
  });

  // --------------------------------------------- Get list category -------------------------------
  const categoryQuery = useQuery({
    queryKey: ['category-spending'],
    queryFn: () => getCategories({
      status: 'expenses',
    }),
    enabled: !!userKey && !!isSuccess,
    select: (data) => listCategoryTransform(data.data.data),
    retry: 3,
  });

  const listCategoryTransform = useCallback((categories) => {
    const result = categories ? categories.map(category => {
      return {
        id: category.id,
        name: category.name,
        color: category.color,
        icon: category.icon,
        status: category.status,
        amount: category.amount,
        current: 0,
        createdAt: category.created_at,
        updatedAt: category.updated_at,
      };
    }) : [];

    data.forEach(item => {
      const categoryIndex = result.findIndex(category => {
        return item.category.id === category.id
      })
      if (categoryIndex !== -1) {
        result[categoryIndex].current += item.amount
      }
    })

    return result
  }, [data]);

  // ---------------------------------------------- Add plan ------------------------------------
  const addPlanMutation = useMutation({
    mutationFn: (data) => {
      return addPlan(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-spending'] })
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // ---------------------------------------------- Delete plan ------------------------------------
  const deletePlanMutation = useMutation({
    mutationFn: (data) => {
      return deleteExpense({
        userKey: userKey,
        id: data.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spending'] })
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    categories: categoryQuery?.data || [],
    addPlanMutation,
    deletePlanMutation,
  };
}
