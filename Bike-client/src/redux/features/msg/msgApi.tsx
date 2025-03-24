
import { baseApi } from '../../api/baseApi';

const msgApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -----------------------------------add section---------------------------------------------

    //Add product
    addMessage: builder.mutation({
        query: (data) => ({
          url: '/msg',
          method: 'POST',
          body: data,
        }),
        invalidatesTags:['msg'],
      }),

     //----------------------------------product Section-----------------------------------------

    // Get all bikes
    getAllMessages: builder.query({
        query: () => ({
          url: '/msg',
          method: 'GET',
        }),
        providesTags:['msg'],
      }), 
    
    // Delete a bike by id
    deleteMessage: builder.mutation({
      query: (id: string) => ({
        url: `/msg/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['msg'],
    })

}),
});

export const { 
    useAddMessageMutation,
    useDeleteMessageMutation,
    useGetAllMessagesQuery,
} = msgApi;