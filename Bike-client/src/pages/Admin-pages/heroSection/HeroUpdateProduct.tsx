import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"; // For notifications
import { useNavigate, useParams } from "react-router-dom"; // For navigation and params
import { updateProductSchema } from "@/schema/updateProductValidationScheme";
import { useEffect, useState } from "react";
import { useGetSingleHeroBikeQuery, useUpdateHeroBikeMutation } from "@/redux/features/hero/heroApi";
import { Skeleton } from "@/components/ui/skeleton";

const EditHeroProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation

  // Fetch the current product details using the product ID
  const { data: product, isLoading, isError } = useGetSingleHeroBikeQuery(id);
  
  const [updateProductMutation, { isLoading: isUpdating }] = useUpdateHeroBikeMutation();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(updateProductSchema), // Your Zod validation schema for editing a product
  });

  // State to handle the selected image preview
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Set initial values for the form fields once the product is loaded
  useEffect(() => {
    if (product) {
      setValue("name", product.data.name);
      setValue("brand", product.data.brand);
      setValue("model", product.data.model);
      setValue("category", product.data.category);
      setValue("price", product.data.price);
      setValue("stock", product.data.stock);
      setValue("image", product.data.image); // Set previous image
      setSelectedImage(product.data.image); // Set previous image preview
    }
  }, [product, setValue]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Handle form submission
  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating product...");
    try {
      const updateData = {
        id, // Product ID
        data: { 
          name: data.name, 
          brand: data.brand, 
          model: data.model, 
          category: data.category, 
          price: data.price, 
          stock: data.stock, 
          image: selectedImage || product?.data.image, // Update image
        },
      };
      console.log(updateData);
      const response = await updateProductMutation(updateData).unwrap();
      toast.success("Product updated successfully!", { id: toastId });
      console.log("Product updated:", response);

      // Redirect to the product list page after successful update
      navigate("/dashboard-admin/hero"); 
    } catch (error) {
      toast.error(error.data?.message || "Failed to update product", { id: toastId });
      console.error("Update product error:", error);
    }
  };

  // Handle loading or error states
  if (isLoading) {
    return <div><Skeleton className="w-[100px] h-[20px] rounded-full" /></div>;
  }

  if (isError) {
    return <div>Error loading product data</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold text-center">Edit Product</h2>

        {/* Image Preview */}
        {selectedImage && (
          <div className="flex justify-center">
            <img src={selectedImage} alt="Product" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <Input
            type="text"
            placeholder="Product Name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message?.toString()}</span>}
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <select
            {...register("brand")}
            className={`w-full p-2 border rounded-md ${errors.brand ? "border-red-500" : ""}`}
          >
            <option value="Honda">Honda</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Kawasaki">Kawasaki</option>
          </select>
          {errors.brand && <span className="text-red-500 text-sm">{errors.brand.message?.toString()}</span>}
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <select
            {...register("model")}
            className={`w-full p-2 border rounded-md ${errors.model ? "border-red-500" : ""}`}
          >
            <option value="Sport">Sport</option>
            <option value="Cruiser">Cruiser</option>
            <option value="Touring">Touring</option>
          </select>
          {errors.model && <span className="text-red-500 text-sm">{errors.model.message?.toString()}</span>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("category")}
            className={`w-full p-2 border rounded-md ${errors.category ? "border-red-500" : ""}`}
          >
            <option value="Superbike">Superbike</option>
            <option value="Adventure">Adventure</option>
            <option value="Commuter">Commuter</option>
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message?.toString()}</span>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <Input
            type="text"
            placeholder="Price"
            {...register("price")}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price.message?.toString()}</span>}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
          <Input
            type="text"
            placeholder="Stock Quantity"
            {...register("stock")}
            className={errors.stock ? "border-red-500" : ""}
          />
          {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message?.toString()}</span>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EditHeroProductPage;
