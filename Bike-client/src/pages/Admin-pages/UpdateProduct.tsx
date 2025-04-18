// import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner"; // For notifications
// import { useNavigate, useParams } from "react-router-dom"; // For navigation and params
// import { useGetSingleBikeQuery, useUpdateBikeMutation } from "@/redux/features/auth/authApi";
// import { updateProductSchema } from "@/schema/updateProductValidationScheme";
// import { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";

// const EditProductPage = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const navigate = useNavigate(); // For navigation

//   // Fetch the current product details using the product ID
//   const { data: product, isLoading, isError } = useGetSingleBikeQuery(id);

//   const [updateProductMutation, { isLoading: isUpdating }] = useUpdateBikeMutation();

//   const { register, handleSubmit, formState: { errors }, setValue } = useForm({
//     resolver: zodResolver(updateProductSchema), // Your Zod validation schema for editing a product
//   });

//   // State to handle the selected image preview
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   // Set initial values for the form fields once the product is loaded
//   useEffect(() => {
//     if (product) {
//       setValue("name", product.data.name);
//       setValue("brand", product.data.brand);
//       setValue("model", product.data.model);
//       setValue("category", product.data.category);
//       setValue("price", product.data.price);
//       setValue("stock", product.data.stock);
//       setValue("flashSale", product.data.flashSale);
//       setValue("image", product.data.image); // Set previous image
//       setSelectedImage(product.data.image); // Set previous image preview
//     }
//   }, [product, setValue]);
   
//   console.log(product);

//   // Handle image change
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//     }
//   };

//   // Handle form submission
//   const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
//     const toastId = toast.loading("Updating product...");
//     try {
//       const updateData = {
//         id, // Product ID
//         data: { 
//           name: data.name, 
//           brand: data.brand, 
//           model: data.model, 
//           category: data.category, 
//           price: data.price, 
//           stock: data.stock,
//           flashSale:data.flashSale, 
//           image: selectedImage || product?.data.image, // Update image
//         },
//       };
//       const response = await updateProductMutation(updateData).unwrap();
//       toast.success("Product updated successfully!", { id: toastId });
//       console.log("Product updated:", response);

//       // Redirect to the product list page after successful update
//       navigate("/dashboard-admin/products"); 
//     } catch (error) {
//       toast.error(error.data?.message || "Failed to update product", { id: toastId });
//       console.error("Update product error:", error);
//     }
//   };

//   // Handle loading or error states
//   if (isLoading) {
//     return <div><Skeleton className="w-[100px] h-[20px] rounded-full" /></div>;
//   }

//   if (isError) {
//     return <div>Error loading product data</div>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[50%] p-4 rounded-lg">
//         <h2 className="text-xl font-semibold text-center">Edit Product</h2>

//         {/* Image Preview */}
//         {selectedImage && (
//           <div className="flex justify-center">
//             <img src={selectedImage} alt="Product" className="w-40 h-32 object-cover rounded-md" />
//           </div>
//         )}

//         {/* Upload Image */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Product Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         {/* Product Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Product Name</label>
//           <Input
//             type="text"
//             placeholder="Product Name"
//             {...register("name")}
//             className={errors.name ? "border-red-500" : ""}
//           />
//           {errors.name && <span className="text-red-500 text-sm">{errors.name.message?.toString()}</span>}
//         </div>

//         {/* Brand */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Brand</label>
//           <select
//             {...register("brand")}
//             className={`w-full p-2 border rounded-md ${errors.brand ? "border-red-500" : ""}`}
//           >
//             <option value="Honda">Honda</option>
//             <option value="Yamaha">Yamaha</option>
//             <option value="Kawasaki">Kawasaki</option>
//           </select>
//           {errors.brand && <span className="text-red-500 text-sm">{errors.brand.message?.toString()}</span>}
//         </div>

//         {/* Model */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Model</label>
//           <select
//             {...register("model")}
//             className={`w-full p-2 border rounded-md ${errors.model ? "border-red-500" : ""}`}
//           >
//             <option value="Sport">Sport</option>
//             <option value="Cruiser">Cruiser</option>
//             <option value="Touring">Touring</option>
//           </select>
//           {errors.model && <span className="text-red-500 text-sm">{errors.model.message?.toString()}</span>}
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Category</label>
//           <select
//             {...register("category")}
//             className={`w-full p-2 border rounded-md ${errors.category ? "border-red-500" : ""}`}
//           >
//             <option value="Superbike">Superbike</option>
//             <option value="Adventure">Adventure</option>
//             <option value="Commuter">Commuter</option>
//           </select>
//           {errors.category && <span className="text-red-500 text-sm">{errors.category.message?.toString()}</span>}
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Price</label>
//           <Input
//             type="text"
//             placeholder="Price"
//             {...register("price")}
//             className={errors.price ? "border-red-500" : ""}
//           />
//           {errors.price && <span className="text-red-500 text-sm">{errors.price.message?.toString()}</span>}
//         </div>

//         {/* Stock */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
//           <Input
//             type="text"
//             placeholder="Stock Quantity"
//             {...register("stock")}
//             className={errors.stock ? "border-red-500" : ""}
//           />
//           {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message?.toString()}</span>}
//         </div>

//          {/* flashSale */}

//         <div>
//           <label className="block text-sm font-medium text-gray-700">False Sale</label>
//           <select
//              {...register("flashSale")}
//              className={`w-full p-2 border rounded-md ${errors.flashSale ? "border-red-500" : ""}`}
//           >
//           <option value="true">Add</option>
//           <option value="false">Remove</option>
//           </select>
//           {errors.flashSale && <span className="text-red-500 text-sm">{errors.flashSale.message?.toString()}</span>}
//         </div>

//         {/* Submit Button */}
//         <Button type="submit" className="w-full" disabled={isUpdating}>
//           {isUpdating ? "Updating..." : "Save Changes"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default EditProductPage;


import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBikeQuery, useUpdateBikeMutation } from "@/redux/features/auth/authApi";
import { updateProductSchema } from "@/schema/updateProductValidationScheme";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetSingleBikeQuery(id);
  const [updateProductMutation, { isLoading: isUpdating }] = useUpdateBikeMutation();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(updateProductSchema),
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setValue("name", product.data.name);
      setValue("brand", product.data.brand);
      setValue("model", product.data.model);
      setValue("category", product.data.category);
      setValue("price", product.data.price);
      setValue("stock", product.data.stock);
      setValue("flashSale", product.data.flashSale);
      setValue("trending", product.data.trending);
      setValue("popular", product.data.popular);
      setValue("electric", product.data.electric);
      setValue("upcoming", product.data.upcoming);
      setValue("image", product.data.image);
      setSelectedImage(product.data.image);
    }
  }, [product, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating product...");
    try {
      const updateData = {
        id,
        data: {
          name: data.name,
          brand: data.brand,
          model: data.model,
          category: data.category,
          price: data.price,
          stock: data.stock,
          flashSale: data.flashSale,
          trending: data.trending,
          popular: data.popular,
          electric: data.electric,
          upcoming: data.upcoming,
          image: selectedImage || product?.data.image,
        },
      };
      const response = await updateProductMutation(updateData).unwrap();
      console.log(response)
      toast.success("Product updated successfully!", { id: toastId });
      navigate("/dashboard-admin/products");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update product", { id: toastId });
    }
  };

  if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  if (isError) return <div>Error loading product data</div>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[70%] p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Edit Product</h2>

        {selectedImage && (
          <div className="flex justify-center">
            <img src={selectedImage} alt="Product" className="w-40 h-32 object-cover rounded-md" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Row: Name & Brand */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <Input
              type="text"
              placeholder="Product Name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message?.toString()}</span>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <select
              {...register("brand")}
              className={`w-full p-2 border rounded-md ${errors.brand ? "border-red-500" : ""}`}
            >
              <option value="">Select</option>
              <option value="Honda">Honda</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Kawasaki">Kawasaki</option>
            </select>
            {errors.brand && <span className="text-red-500 text-sm">{errors.brand.message?.toString()}</span>}
          </div>
        </div>

        {/* Row: Model & Category */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <select
              {...register("model")}
              className={`w-full p-2 border rounded-md ${errors.model ? "border-red-500" : ""}`}
            >
              <option value="">Select</option>
              <option value="Sport">Sport</option>
              <option value="Cruiser">Cruiser</option>
              <option value="Touring">Touring</option>
            </select>
            {errors.model && <span className="text-red-500 text-sm">{errors.model.message?.toString()}</span>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register("category")}
              className={`w-full p-2 border rounded-md ${errors.category ? "border-red-500" : ""}`}
            >
              <option value="">Select</option>
              <option value="Superbike">Superbike</option>
              <option value="Adventure">Adventure</option>
              <option value="Commuter">Commuter</option>
            </select>
            {errors.category && <span className="text-red-500 text-sm">{errors.category.message?.toString()}</span>}
          </div>
        </div>

        {/* Row: Price & Stock */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <Input
              type="text"
              placeholder="Price"
              {...register("price")}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price.message?.toString()}</span>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <Input
              type="text"
              placeholder="Stock Quantity"
              {...register("stock")}
              className={errors.stock ? "border-red-500" : ""}
            />
            {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message?.toString()}</span>}
          </div>
        </div>

        {/* Row: Flash Sale & Trending */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Flash Sale</label>
            <select {...register("flashSale")} className="w-full p-2 border rounded-md">
              <option value="true">Add</option>
              <option value="false">Remove</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Trending</label>
            <select {...register("trending")} className="w-full p-2 border rounded-md">
              <option value="true">Add</option>
              <option value="false">Remove</option>
            </select>
          </div>
        </div>

        {/* Row: Popular & Electric */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Popular</label>
            <select {...register("popular")} className="w-full p-2 border rounded-md">
              <option value="true">Add</option>
              <option value="false">Remove</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Electric</label>
            <select {...register("electric")} className="w-full p-2 border rounded-md">
              <option value="true">Add</option>
              <option value="false">Remove</option>
            </select>
          </div>
        </div>

        {/* Row: Upcoming */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upcoming</label>
          <select {...register("upcoming")} className="w-full p-2 border rounded-md">
            <option value="true">Add</option>
            <option value="false">Remove</option>
          </select>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
