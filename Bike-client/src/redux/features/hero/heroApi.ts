/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from '@/types/global';
import { baseApi } from '../../api/baseApi';
import { TBike } from '@/types/user';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -----------------------------------add section---------------------------------------------

    //Add product
    addHeroProducts: builder.mutation({
        query: (data) => ({
          url: '/hero',
          method: 'POST',
          body: data,
        }),
        invalidatesTags:['hero'],
      }),

     //----------------------------------product Section-----------------------------------------

    // Get all bikes
    getAllHeroBikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams(); // Initialize params
    
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
    
        return {
          url: '/hero', // Adjust the URL if necessary
          method: 'GET',
          params: params,
        };
      },
      providesTags:['hero'],
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),    
    // Get a single bike by ID
    getSingleHeroBike: builder.query({
      query: (id: string) => ({
        url: `/hero/${id}`,
        method: 'GET',
      }),
    }),


    // Delete a bike by id
    deleteHeroBike: builder.mutation({
      query: (id: string) => ({
        url: `/hero/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['hero'],
    }),


    // Update a bike by id
    updateHeroBike: builder.mutation({
      query: (payload: { id: string; data: any }) => ({
        url: `/hero/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags:['hero'],
    }),

}),
});

export const { 
    useAddHeroProductsMutation,
    useGetAllHeroBikesQuery,
    useGetSingleHeroBikeQuery,
    useDeleteHeroBikeMutation,
    useUpdateHeroBikeMutation,
} = authApi;