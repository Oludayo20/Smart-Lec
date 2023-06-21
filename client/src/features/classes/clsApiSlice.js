import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const clsAdapter = createEntityAdapter({});

const initialState = clsAdapter.getInitialState();

export const clsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCls: builder.query({
      query: () => ({
        url: '/class/getAllCls',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedCls = responseData.map((cls) => {
          cls.id = cls.class_id;
          return cls;
        });
        return clsAdapter.setAll(initialState, loadedCls);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Class', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Class', id }))
          ];
        } else {
          return [{ type: 'Class', id: 'LIST' }];
        }
      }
    }),
    getClassById: builder.query({
      query: (classId) => ({
        url: '/class/getClsDetailsById',
        method: 'POST',
        body: { classId },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedClass = { ...responseData };
        loadedClass.id = loadedClass.class_id;
        return clsAdapter.upsertOne(initialState, loadedClass);
      },
      providesTags: (result, error, classId) => {
        if (result) {
          return [{ type: 'Class', id: result.id }];
        } else {
          return [{ type: 'Class', id: classId }];
        }
      }
    }),
    addNewCls: builder.mutation({
      query: (initialCls) => ({
        url: '/class/create',
        method: 'POST',
        body: {
          ...initialCls
        }
      }),
      invalidatesTags: [{ type: 'Class', id: 'LIST' }]
    }),
    updateCls: builder.mutation({
      query: (initialCls) => ({
        url: '/class/updateCls',
        method: 'PATCH',
        body: {
          ...initialCls
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Class', id: arg.id }]
    }),
    deleteCls: builder.mutation({
      query: (clsId) => ({
        url: '/class/deleteCls',
        method: 'DELETE',
        body: { clsId }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Class', id: arg.clsId }
      ]
    })
  })
});

export const {
  useGetClsQuery,
  useGetClassByIdQuery,
  useAddNewClsMutation,
  useUpdateClsMutation,
  useDeleteClsMutation
} = clsApiSlice;

// returns the query result object
export const selectClsResult = clsApiSlice.endpoints.getCls.select();

// creates memoized selector
const selectClsData = createSelector(
  selectClsResult,
  (clsResult) => clsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllCls,
  selectById: selectClsById,
  selectIds: selectClsIds
  // Pass in a selector that returns the Cls slice of state
} = clsAdapter.getSelectors((state) => selectClsData(state) ?? initialState);
