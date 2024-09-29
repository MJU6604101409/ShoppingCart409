// import { useState } from 'react';
// import { people } from './data.js';
// import { getImageUrl } from './utils.js';
 
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
  import { useState } from 'react';

  const productsData = [
  { id: 1, name: 'หมูสามชั้น', price: 59, image: '/picture/สามชั้น.jpg' },
  { id: 2, name: 'หมูหมักน้ำมันงา', price: 69, image: '/picture/หมักงา.png' },
  { id: 3, name: 'เนื้อวากิว', price: 99, image: '/picture/เนื้อวากิว.jpg' },
  { id: 4, name: 'กุ้งแก้ว', price: 69, image: '/picture/กุ้งแก้ว.jpg' },
  { id: 5, name: 'เต้าหู้ชีส', price: 49, image: '/picture/เต้าหู้.jpg' },
  { id: 6, name: 'ไข่ไก่', price: 9, image: '/picture/ไข่ไก่.jpg' },
  { id: 7, name: 'ผักกาด', price: 19, image: '/picture/ผักกาด.jpg' },
  { id: 8, name: 'ผักบุ้ง', price: 19, image: '/picture/ผักบุ้ง.png' },
  { id: 9, name: 'เฟรนช์ฟรายส์', price: 39, image: '/picture/เฟรนช์ฟรายส์.jpg' },
  { id: 10, name: 'ไอศกรีม', price: 39, image: '/picture/ice cream.jpg' },
];

const coupons = [
  { code: 'DISCOUNT10', discount: 10 }, 
  { code: 'DISCOUNT20', discount: 20 }, 
  { code: 'SHIPFREE', discount: 15 }     
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
    if (newQuantity < 1) return; 
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleApplyDiscount = (coupon) => {
    const validCoupon = coupons.find(c => c.code === coupon);
    if (validCoupon) {
      setDiscount(validCoupon.discount / 100); 
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon code.');
      setDiscount(0);
    }
  };
  

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWithShipping = total > 0 ? total + 100 - total * discount : 0;

  return (
    <div className="App">
      <h1 className="header text-2xl font-bold">ยูนิเวอร์ซิตี้ หมูทะ</h1>
        <div className="product-list grid grid-cols-2 gap-4 p-4">
          {productsData.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="mb-2" />
              <h2>{product.name}</h2>
              <p>Price: {product.price}฿</p>
              <div className="button-container">
            <button onClick={() => addToCart(product)} className="add-to-cart-button bg-blue-500 text-white px-2 py-1">
              Add to Cart
            </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="cart-title text-xl font-bold">สินค้าในตะกร้า</h2>
      <div className="cart p-4">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="flex justify-between border p-2">
              <span>{item.name}</span>
              <span>จำนวน: 
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
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
          <p>ตะกร้าสินค้าคุณว่างเปล่า</p>
        )}
        <div className="mt-4">
          <p>ยอดรวม: {total}฿</p>
          <p>ค่าขนส่ง: 100฿</p>
          <p>คูปองส่วนลด: {discount * 100}%</p>
          <p className="font-bold">ยอดรวมค่าจัดส่ง: {totalWithShipping}฿</p>

          <input
            type="text"
            placeholder="Coupon Code"
            onBlur={(e) => handleApplyDiscount(e.target.value)}
            className="border p-2 mt-2"
          />
          {discountError && <p className="text-red-500">{discountError}</p>}
        </div>
      </div>
    
    {/* กล่องแสดงตารางคูปอง */}
    <div className="coupon-table fixed bottom-0 right-0 bg-gray-100 border p-4 m-4 shadow-lg">
        <h3 className="text-lg font-bold">ตารางคูปอง</h3>
        <ul>
          {coupons.map(coupon => (
            <li key={coupon.code}>
              <span>{coupon.code}: ลด {coupon.discount}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;