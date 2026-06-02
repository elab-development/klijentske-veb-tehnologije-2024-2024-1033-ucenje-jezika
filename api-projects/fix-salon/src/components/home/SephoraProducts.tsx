import { useEffect, useState } from 'react';
import { getSephoraProducts } from '../../api/sephoraApi';
import { SephoraProduct } from '../../models/Products';
import Loader from '../shared/Loader';

const SephoraProducts = () => {
  const [products, setProducts] = useState<SephoraProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSephora = async () => {
      setIsLoading(true);

      try {
        const res = await getSephoraProducts();
        let productsArray: SephoraProduct[] = [];
        res.products.map((product: any) => {
          const sephoraProduct = new SephoraProduct(
            product.brandName,
            product.displayName,
            product.altImage,
            product.heroImage,
            'https://www.sephora.com' + product.targetUrl
          );
          productsArray.push(sephoraProduct);
        });
        setProducts(productsArray);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchSephora();
  }, []);

  return (
    <div className='flex flex-col gap-2 uppercase justify-center items-center my-10'>
      <p className='text-4xl text-center'>ponuda naših partnera</p>
      {isLoading ? (
        <Loader />
      ) : products?.length === 0 ? (
        <p>No products! Check your API</p>
      ) : (
        <div className='mt-5 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-10'>
          {products.map((product, index) => (
            <div
              className='max-w-xs bg-white border border-gray rounded-lg shadow'
              key={index}
            >
              <a href={product.url} target='_blank' rel='noopener noreferrer'>
                <img
                  src={product.heroImage}
                  alt='sephora'
                  className='rounded-t-lg'
                />
              </a>
              <div className='p-5'>
                <a href={product.url} target='_blank' rel='noopener noreferrer'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-black line-clamp-1'>
                    {product.displayName}
                  </h5>
                </a>
                <p className='font-extrabold'>{product.brandName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SephoraProducts;
