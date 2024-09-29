import { useState } from 'react';
import { people } from './data.js';
import { getImageUrl } from './utils.js';
 
// export default function List() {
//   const chemists = people.filter(person =>
//     person.profession === 'chemist'
//   );
 
//   const everryoneElse = people.filter(person =>
//     person.profession !== 'chemist'
//   );
 
  //ตะกร้าสินค้า
  // const [cart, setCart] = useState([]);
 
  // function addToCart(prd){
  //   //เพิ่มรายการสินค้าในตะกร้า
  //   // cart[ {prd},{prd},{prd}.. ]
  //   setCart( // Replace the state
  //     [ // with a new array
  //       ...cart, // that contains all the old items
  //       prd // and one new item at the end
  //     ]
  //   );
  //   console.log(cart);
 
  // }
  //     return (
  //       <article>
  //         <h1>Shopping Cart</h1>
  //         {cart.map((product) => (
  //           <p key={product.id}>{product.name}</p>
  //         ))}
     
  //         <p>ชื่อสินค้า</p>
  //       <hr />
  //       <h1>Scientists</h1>
  //       <ul>{chemists.map((person) => (
  //         <li key={person.id}>
  //           <img
  //           src={getImageUrl(person)}
  //           alt={person.name}
  //           onClick={() => addToCart(person)}
  //           />
  //         </li>
  //       )
  //     )
  //     }
  //       </ul>
  //    </article>
  //   );
  //   }
  
  const productsData = [
  { id: 1, name: 'Product 1', price: 500, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: 600, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: 700, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product 4', price: 800, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Product 5', price: 900, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Product 6', price: 1000, image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Product 7', price: 1100, image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Product 8', price: 1200, image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Product 9', price: 1300, image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Product 10', price: 1400, image: 'https://via.placeholder.com/150' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent setting quantity to less than 1
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleApplyDiscount = (coupon) => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.1);
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon code.');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWithShipping = total > 0 ? total + 100 - total * discount : 0;

  return (
    <div className="App">
      <h1 className="header text-2xl font-bold">Product List</h1>
      <div className="product-list grid grid-cols-2 gap-4 p-4">
        {productsData.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="mb-2" />
            <h2>{product.name}</h2>
            <p>Price: {product.price}฿</p>
            <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-2 py-1">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-center">Shopping Cart</h2>
      <div className="cart p-4">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="flex justify-between border p-2">
              <span>{item.name}</span>
              <span>Quantity: 
                <input
                  type="number"
                  value={item.quantity}
                  min="1" // Prevent negative or zero quantities
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border w-12 ml-2"
                />
              </span>
              <span>{item.price * item.quantity}฿</span>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 ml-2">
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="mt-4">
          <p>Total: {total}฿</p>
          <p>Shipping: 100฿</p>
          <p>Discount: {discount * 100}%</p>
          <p className="font-bold">Total with Shipping: {totalWithShipping}฿</p>

          <input
            type="text"
            placeholder="Coupon Code"
            onBlur={(e) => handleApplyDiscount(e.target.value)}
            className="border p-2 mt-2"
          />
          {discountError && <p className="text-red-500">{discountError}</p>} {/* Error message for invalid coupon */}
        </div>
      </div>
    </div>
  );
}

export default App;