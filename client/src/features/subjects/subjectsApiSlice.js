import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const subjectsAdapter = createEntityAdapter({});

const initialState = subjectsAdapter.getInitialState();

export const subjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => ({
        url: '/subject/getAllSubject',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedSubjects = responseData.map((subject) => {
          subject.id = subject.subject_id;
          return subject;
        });
        return subjectsAdapter.setAll(initialState, loadedSubjects);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Subject', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Subject', id }))
          ];
        } else return [{ type: 'Subject', id: 'LIST' }];
      }
    }),
    addNewSubject: builder.mutation({
      query: (initialSubjectData) => ({
        url: '/subject/create',
        method: 'POST',
        body: {
          ...initialSubjectData
        }
      }),
      invalidatesTags: [{ type: 'Subject', id: 'LIST' }]
    }),
    updateSubject: builder.mutation({
      query: (initialSubjectData) => ({
        url: '/subject/',
        method: 'PATCH',
        body: {
          ...initialSubjectData
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Subject', id: arg.id }]
    }),
    deleteSubject: builder.mutation({
      query: ({ id }) => ({
        url: `/subject`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Subject', id: arg.id }]
    })
  })
});

export const {
  useGetSubjectsQuery,
  useAddNewSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation
} = subjectsApiSlice;

// returns the query result object
export const selectSubjectsResult =
  subjectsApiSlice.endpoints.getSubjects.select();

// creates memoized selector
const selectSubjectsData = createSelector(
  selectSubjectsResult,
  (subjectsResult) => subjectsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSubjects,
  selectById: selectSubjectById,
  selectIds: selectSubjectIds
  // Pass in a selector that returns the Subjects slice of state
} = subjectsAdapter.getSelectors(
  (state) => selectSubjectsData(state) ?? initialState
);
