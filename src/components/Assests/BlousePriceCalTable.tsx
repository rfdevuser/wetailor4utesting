import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/actions/cartActions'; // Adjust path as necessary
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
interface BlousePriceCalTableProps {
  productName: string;
  productPrice: string;
  productImage: string;
  sleevesName?: string;
  sleevesPrice?: string;
  detailsName?: string;
  detailsPrice?: string;
  extraName?: string;
  extraPrice?: string;
  mainFabricName?: string;
  mainFabricPrice?: string;
  liningFabricName?: string;
  liningFabricPrice?: string;
  RegularPrice?: string;
  slug?: string;
  pid?:string
}

const BlousePriceCalTable: React.FC<BlousePriceCalTableProps> = ({
  productName,
  productPrice,
  productImage,
  sleevesName,
  sleevesPrice,
  detailsName,
  detailsPrice,
  extraName,
  extraPrice,
  mainFabricName,
  mainFabricPrice,
  liningFabricName,
  liningFabricPrice,
  RegularPrice,
  slug,
  pid,
}) => {
  const dispatch = useDispatch();

  const formatPrice = (priceString: string | number): number => {
    if (typeof priceString === 'string') {
      const numericPrice = priceString.replace(/[^0-9.]/g, '');
      return parseFloat(numericPrice) || 0;
    } else if (typeof priceString === 'number') {
      return priceString;
    }
    return 0;
  };

  const totalPrice = (
    formatPrice(productPrice) +
    (parseFloat(sleevesPrice || '0') || 0) +
    (parseFloat(detailsPrice || '0') || 0) +
    (parseFloat(extraPrice || '0') || 0) +
    formatPrice(mainFabricPrice || '') +
    formatPrice(liningFabricPrice || '')
  ).toFixed(2);

  const regulartotalPrice = (
    formatPrice(RegularPrice || '0') - 
    formatPrice(productPrice) + 
    (parseFloat(sleevesPrice || '0') || 0) +
    (parseFloat(detailsPrice || '0') || 0) +
    (parseFloat(extraPrice || '0') || 0) +
    formatPrice(mainFabricPrice || '') +
    formatPrice(liningFabricPrice || '')
  ).toFixed(2);
  
  const finalregularPrice = (
    formatPrice(RegularPrice || '0')+ formatPrice(regulartotalPrice)
  ).toFixed(2);
  const showMessage = () => {
    toast.info('Hello, world!');
  };
  const handleAddToCart = () => {
    const concatenatedNames = [
      productName,
      sleevesName,
      detailsName,
      extraName,
      mainFabricName,
      liningFabricName,
    ].filter(Boolean).join(', ');

    dispatch(addToCart({
      name: concatenatedNames,
      price: parseFloat(totalPrice),
      image: productImage,
      RegPrice: finalregularPrice,
      slug: slug || '',
      pid: pid || ''
    }));
 
  };


  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg mb-6">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Item</th>
            <th className="border border-gray-400 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {productName && productPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{productName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{formatPrice(productPrice)}</td>
            </tr>
          )}
          {sleevesName && sleevesPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{sleevesName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{sleevesPrice}</td>
            </tr>
          )}
          {detailsName && detailsPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{detailsName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{detailsPrice}</td>
            </tr>
          )}
          {extraName && extraPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{extraName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{extraPrice}</td>
            </tr>
          )}
          {mainFabricName && mainFabricPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{mainFabricName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{formatPrice(mainFabricPrice)}</td>
            </tr>
          )}
          {liningFabricName && liningFabricPrice && (
            <tr>
              <td className="border border-gray-400 px-4 py-2">{liningFabricName}</td>
              <td className="border border-gray-400 px-4 py-2">₹{formatPrice(liningFabricPrice)}</td>
            </tr>
          )}
          {(productName || sleevesName || detailsName || extraName || mainFabricName || liningFabricName) && (
            <tr className="bg-gray-200">
              <td className="border border-gray-400 px-4 py-2"><strong>Total</strong></td>
              <td className="border border-gray-400 px-4 py-2"><strong>₹{totalPrice}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-center'>
  <button
  
    onClick={(e) => {
      if (!productPrice) {
        alert("Please select a size.");
        return; // Prevent further action
      }
      
      const button = e.currentTarget;

      // Add a class to trigger the animation
      button.classList.add('clicked');
      handleAddToCart();

      // Remove the class after the animation duration
      setTimeout(() => {
        button.classList.remove('clicked');
      }, 300); // Match this duration to your CSS animation duration
    }}
    className={`mt-4 px-4 py-2 rounded transition duration-200 flex justify-center ${productPrice ? 'bg-green-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
    disabled={!productPrice} // Disable button if productPrice is not available
  >
    Add to Cart
  </button>
</div>

<style jsx>{`
  button.clicked {
    transform: scale(0.95);
    transition: transform 0.2s ease;
  }
`}</style>

    </div>
  );
};

export default BlousePriceCalTable;
