import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const studentsAdapter = createEntityAdapter({});

const initialState = studentsAdapter.getInitialState();

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: '/student/getAllStudent',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedStudents = responseData.map((student) => {
          student.id = student.student_id;
          return student;
        });
        return studentsAdapter.setAll(initialState, loadedStudents);
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        if (result?.ids) {
          return [
            { type: 'Student', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Student', id }))
          ];
        } else return [{ type: 'Student', id: 'LIST' }];
      }
    }),
    addNewStudent: builder.mutation({
      query: (initialUserData) => ({
        url: '/student/register',
        method: 'POST',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }]
    }),
    updateStudent: builder.mutation({
      query: (initialStudentData) => ({
        url: '/staff',
        method: 'PATCH',
        body: {
          ...initialStudentData
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Student', id: arg.id }]
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `/staff`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Student', id: arg.id }]
    })
  })
});

export const {
  useGetStudentsQuery,
  useAddNewStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation
} = studentsApiSlice;

// returns the query result object
export const selectStudentsResult =
  studentsApiSlice.endpoints.getStudents.select();

// creates memoized selector
const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentsResult) => studentsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStudents,
  selectById: selectStudentsById,
  selectIds: selectStudentsIds
  // Pass in a selector that returns the student slice of state
} = studentsAdapter.getSelectors(
  (state) => selectStudentsData(state) ?? initialState
);
