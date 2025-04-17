/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from '@/types/global';
import { baseApi } from '../../api/baseApi';
import { TBike } from '@/types/user';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),


    // -----------------------------------add section---------------------------------------------

    //Add user
    addUser: builder.mutation({
        query: (data) => ({
          url: '/auth/register',
          method: 'POST',
          body: data,
        }),
      }),
    //Add product
    addProducts: builder.mutation({
        query: (data) => ({
          url: '/blogs',
          method: 'POST',
          body: data,
        }),
        invalidatesTags:['demo'],
      }),
    // add order
    addOrder: builder.mutation({
        query: (data) => ({
          url: '/order',
          method: 'POST',
          body: data,
        }),
     }),


     //----------------------------------product Section-----------------------------------------

    // Get all bikes
    getAllBikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams(); // Initialize params
    
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
    
        return {
          url: '/blogs', // Adjust the URL if necessary
          method: 'GET',
          params: params,
        };
      },
      providesTags:['demo'],
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),    
    // Get a single bike by ID
    getSingleBike: builder.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
    }),


    // Delete a bike by id
    deleteBike: builder.mutation({
      query: (id: string) => ({
        url: `/admin/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['demo'],
    }),
    
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['order'],
    }),



    // Update a bike by id
    updateBike: builder.mutation({
      query: (payload: { id: string; data: any }) => ({
        url: `/blogs/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags:['demo'],
    }),

    // flash a bike
    getFlashBikes: builder.query({
      query: () => ({
        url: '/blogs/flash',
        method: 'GET',
      }),
      providesTags:['demo'],
    }),

    // popular bike
    getPopularBikes: builder.query({
      query: () => ({
        url: '/blogs/popular',
        method: 'GET',
      }),
      providesTags:['demo'],
    }),

    // electric bike
    getElectricBikes: builder.query({
      query: () => ({
        url: '/blogs/electric',
        method: 'GET',
      }),
      providesTags:['demo'],
    }),

    // trending
    getTrendingBikes: builder.query({
      query: () => ({
        url: '/blogs/trending',
        method: 'GET',
      }),
      providesTags:['demo'],
    }),
    
    // Upcomming 
    getUpcommingBikes: builder.query({
      query: () => ({
        url: '/blogs/upcomming',
        method: 'GET',
      }),
      providesTags:['demo'],
    }),

    // get Brand
    getBrandBikes: builder.query({
      query: (brand:string) => ({
        url: `/blogs/brand/${brand}`,
        method: 'GET',
      }),
      providesTags:['demo'],
    }),

    // get Model
    getModelBikes: builder.query({
      query: (model:string) => ({
        url: `/blogs/model/${model}`,
        method: 'GET',
      }),
      providesTags:['demo'],
    }),

   ///--------------------------------------------user section-----------------------------

    //get All users
    getAllUsers: builder.query({
        query: () => ({
          url: '/admin/all-users',
          method: 'GET',
        }),
        providesTags:['user'],
      }),
    //get single user
        getSingleUser: builder.query({
          query: (id: string) => ({
            url: `/auth/getUser/${id}`,
            method: 'GET',
          }),
        }),
    
   //block user
   blockUser: builder.mutation({
          query: (userId) => ({
            url: `/admin/block/${userId}`,
            method: 'PATCH',
          }),
          invalidatesTags:['user'],
        }),
  

    //-------------------------------------------order section--------------------------

    //get All orders
    getAllOrders: builder.query({
        query: () => ({
          url: '/order',
          method: 'GET',
        }),
        providesTags:['order'],
      }),
    
      
    //get single order
    getSingleOrder: builder.query({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: 'GET',
      }),
    }),

    // getmyorders
    getMyOrder: builder.query({
      query: () => ({
        url: '/order/myOrders',
        method: 'GET',
      }),
    }),

    // update order

    updateOrder: builder.mutation({
      query: (payload: { id: string; data: any }) => ({
        url: `/order/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags:['order'],
    }),

    //verify order
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
 
   //--------------------------------------change password--------------------------------

    changePassword: builder.mutation({
        query: (data) => ({
          url: '/auth/change-password',
          method: 'POST',
          body: data,
        }),
      }),
  }),
});

export const { useLoginMutation,
  useAddUserMutation,
  useChangePasswordMutation,
  useGetAllBikesQuery,
  useBlockUserMutation,
  useGetAllUsersQuery,
  useAddProductsMutation,
  useDeleteBikeMutation,
  useUpdateBikeMutation,
  useGetSingleBikeQuery,
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useGetSingleUserQuery,
  useGetMyOrderQuery,
  useVerifyOrderQuery,

  useGetFlashBikesQuery,
  useGetTrendingBikesQuery,
  useGetPopularBikesQuery,
  useGetElectricBikesQuery,
  useGetUpcommingBikesQuery,

  useGetBrandBikesQuery,
  useGetModelBikesQuery,

} = authApi;