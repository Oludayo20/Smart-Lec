import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const studentAdapter = createEntityAdapter({});

const initialState = studentAdapter.getInitialState();

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => ({
        url: '/student/getAllStudent',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedStudent = responseData.map((student) => {
          student.id = student.student_id;
          return student;
        });

        console.log(loadedStudent);
        return studentAdapter.setAll(initialState, loadedStudent);
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        console.log(arg);
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
  useGetStudentQuery,
  useAddNewStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation
} = studentApiSlice;

// returns the query result object
export const selectStudentResult =
  studentApiSlice.endpoints.getStudent.select();

// creates memoized selector
const selectStudentData = createSelector(
  selectStudentResult,
  (studentResult) => studentResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStudent,
  selectById: selectStudentById,
  selectIds: selectStudentIds
  // Pass in a selector that returns the student slice of state
} = studentAdapter.getSelectors(
  (state) => selectStudentData(state) ?? initialState
);
