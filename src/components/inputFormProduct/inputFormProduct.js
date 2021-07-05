import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field, useFormikContext, ErrorMessage} from 'formik';
import { brandCPU, brandVGA, brandMotherboard, brandDrive, brandPSU, brandRAM } from '../brandAndCategory/brandAndCategory';

const InputFormProduct = (props) => {
  const { modalOpen, modalClose, submitFunction, setTableChange, tableChange, title, data, id } = props;
  const [buttonText, setButtonText] = useState(title);

  const BrandsField = (props) => {
    const {
      values: { main_category },
      touched,
      setFieldValue,
    } = useFormikContext();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
      switch (main_category) {
        case 'Processor':
          setBrands(brandCPU)
          break;
        case 'VGA':
          setBrands(brandVGA)
          break;
        case 'Motherboard':
          setBrands(brandMotherboard)
          break;
        case 'RAM':
          setBrands(brandRAM)
          break;
        case 'Drive':
          setBrands(brandDrive)
          break;
        case 'PSU':
          setBrands(brandPSU)
          break;
        default:
          setBrands([])
          break;
      }
    }, [main_category, touched.main_category, setFieldValue]);

    return (
      <Field as="select" name="brand" required>
        <option value="">Select a Brand</option>
        {brands.map(r => (
          <option value={r}>{r}</option>
        ))}
      </Field>
    );
  };

  return (
    <Modal
      isOpen={modalOpen}
      className='modal'
      overlayClassName="overlay"
    >
      <span className='close-btn' onClick={modalClose}><IoClose /></span>
      <h2>{title}</h2>
      <Formik
        initialValues={{
          product_name: data?.product_name || '',
          price: data?.price || null,
          discount_price: data?.dicount_price || 0,
          weight: data?.weight || null,
          stock: data?.stock || null,
          main_category: data?.main_category || '',
          secondary_category: data?.secondary_category || '',
          brand: data?.brand || '',
          requiredError: '',
        }}
        validate={(values) => {
          const error = {};
          if(values.discount_price >= values.price) {
            error.discount_price = 'Discount price must be lower than base price'
          }
          return error;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const product = {
            ...values
          };
          try {
            await submitFunction(product, id);
            setButtonText('Loading, please wait...');
            setTimeout(() => {
              setTableChange(tableChange + 1);
              setSubmitting(false);
              setButtonText(title);
              modalClose();
            }, 2000);
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="modal-form">
            <div>
              <label htmlFor="product_name">Product Name</label>
              <Field type="text" name="product_name" required />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <Field type="number" name="price" required />
            </div>
            <div>
              <label htmlFor="discount_price">Discount Price</label>
              <Field type="number" name="discount_price" />
              <ErrorMessage name="discount_price" component="div" className="error-msg"/>
            </div>
            <div>
              <label htmlFor="weight">Weight</label>
              <Field type="number" name="weight" required />
            </div>
            <div>
              <label htmlFor="stock">Stock</label>
              <Field type="number" name="stock" required />
            </div>
            <div>
              <label htmlFor="main_category">Category</label>
              <Field as="select" name="main_category" required>
                <option value="">Select a Category</option>
                <option value="Processor">Processor</option>
                <option value="VGA">VGA</option>
                <option value="Motherboard">Motherboard</option>
                <option value="Drive">Drive</option>
                <option value="RAM">RAM</option>
                <option value="PSU">PSU</option>
              </Field>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <BrandsField />
            </div>
            <button type="submit" disabled={isSubmitting} className="main-button">
              {buttonText}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default InputFormProduct;