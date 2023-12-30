import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userKeyAtom from '../../storage/userKeyAtom';
import {
  useRecoilState
} from 'recoil'

import {
  getIncomes,
  addIncome,
  getCategories,
  updateIncome,
  deleteIncome
} from '../../services/api';
import { formatDate } from '../../utils/helpers';

export default function useIncome() {
  const queryClient = useQueryClient()

  const [userKey] = useRecoilState(userKeyAtom);

  // ----------------------------------- Get list incomes ----------------------------------------
  const listIncomesTransform = useCallback((data) => {
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
      },
    })) : []
  }, []);

  const listIncomesPresentation = (data) => {
    return data.map(item => {
      return {
        id: item.id,
        name: item.note,
        date: formatDate(item.time),
        price: item.amount,
        category: item.category.name,
        categoryId: item.category.id,
        categoryMetadata: item.category,
      }
    })
  }

  const calculateTotalPrice = (data) => {
    let totalPrice = 0;
    data?.forEach(item => {
      totalPrice += item.price;
    });
    return totalPrice;
  }

  const { data } = useQuery({
    queryKey: ['incomes'],
    queryFn: () => getIncomes({
      userKey,
    }),
    enabled: !!userKey,
    select: (data) => listIncomesPresentation(
      listIncomesTransform(data.data.data)
    ),
    retry: 3,
    staleTime: 5 * 1000
  });

  // --------------------------------------------- Get list category -------------------------------
  const categoryQuery = useQuery({
    queryKey: ['category-incomes'],
    queryFn: () => getCategories({
      status: 'incomes'
    }),
    enabled: !!userKey,
    select: (data) => listCategoryTransform(data.data.data),
    retry: 3,
    staleTime: 5 * 1000
  });

  const listCategoryTransform = useCallback((data) => {
    return data ? data.map(item => {
      return {
        id: item.id,
        name: item.name,
        color: item.color,
        icon: item.icon,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      };
    }) : []
  }, []);

  // ---------------------------------------------- Add income ------------------------------------
  const addIncomeMutation = useMutation({
    mutationFn: (data) => {
      return addIncome({
        note: data.note,
        categoryId: data.category,
        time: (new Date(data.date)).toISOString(),
        amount: data.price,
        userKey: userKey
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // ---------------------------------------------- Update income ------------------------------------
  const updateIncomeMutation = useMutation({
    mutationFn: (data) => {
      return updateIncome({
        note: data.note,
        categoryId: data.category,
        time: (new Date(data.date)).toISOString(),
        amount: data.price,
        userKey: userKey,
        id: data.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // ---------------------------------------------- Delete income ------------------------------------
  const deleteIncomeMutation = useMutation({
    mutationFn: (data) => {
      return deleteIncome({
        userKey: userKey,
        id: data.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    listIncomes: data || [],
    categories: categoryQuery?.data,
    addIncomeMutation,
    updateIncomeMutation,
    deleteIncomeMutation,
    totalPrice: calculateTotalPrice(data)
  };
}
