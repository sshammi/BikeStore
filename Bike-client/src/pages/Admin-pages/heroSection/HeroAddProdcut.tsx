/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, Col, Divider, Row, Input, Form, message } from 'antd';
import PHForm from '@/form/PHForm';
import PHInput from '@/form/PHInput';
import PHSelect from '@/form/PHSelect';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useAddHeroProductsMutation } from '@/redux/features/hero/heroApi';

const CreateHeroProduct = () => {
  const [addProduct, { data, error }] = useAddHeroProductsMutation();
  const navigate=useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding in...");
    const productData = {
      name: data.name,
      brand: data.brand,
      model: data.model,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(productData));

    if (data.image) {
      const imageUrl = await uploadImageToImageBB(data.image);

      data.image=imageUrl;
    }
    console.log(data);
    try {
      const response = await addProduct(data).unwrap();
      message.success('Product added successfully!');
      navigate("/dashboard-admin/hero");
    } catch (err: any) {
      toast.error(err.data?.message || "Add product failed", { id: toastId });
    }
  };

  const uploadImageToImageBB = async (imageFile: File) => {
    const apiKey = '8d2b56eb726d92e77c483dbf69cbd97c'; 
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      return result.data.url;
    } else {
      console.error('Image upload failed:', result.error);
      return '';
    }
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Add Product</Divider>
          <Row gutter={8}>
            {/* Product Name */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name" label="Product Name"/>
            </Col>

            {/* Brand */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={[
                  { label: 'Honda', value: 'Honda' },
                  { label: 'Yamaha', value: 'Yamaha' },
                  { label: 'Kawasaki', value: 'Kawasaki' },
                ]}
                name="brand"
                label="Brand"
              />
            </Col>

            {/* Model */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={[
                  { label: 'Sport', value: 'Sport' },
                  { label: 'Cruiser', value: 'Cruiser' },
                  { label: 'Touring', value: 'Touring' },
                ]}
                name="model"
                label="Model"
              />
            </Col>

            {/* Category */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={[
                  { label: 'Superbike', value: 'Superbike' },
                  { label: 'Adventure', value: 'Adventure' },
                  { label: 'Commuter', value: 'Commuter' },
                ]}
                name="category"
                label="Category"
              />
            </Col>

            {/* Price */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="price" label="Price" />
            </Col>

            {/* Stock */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="stock" label="Stock" />
            </Col>

            {/* Product Image */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Product Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateHeroProduct;
