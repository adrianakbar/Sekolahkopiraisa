"use client";

// pages/product.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail() {
  // Hard-coded product data for immediate testing
  const product = {
    id: "ultraboost-light",
    name: 'Ultraboost Light Running Shoes',
    price: 190.00,
    originalPrice: 220.00,
    discount: '15% OFF',
    rating: 4.8,
    reviewCount: 126,
    description: 'Experience our lightest Ultraboost ever. The Ultraboost Light features a new Light BOOST midsole that delivers the same incredible energy return but with less weight.',
    features: [
      'Regular fit',
      'Lace closure',
      'adidas PRIMEKNIT textile upper',
      'Light BOOST midsole',
      'Continental™ Rubber outsole',
      'Weight: 10.6 ounces',
      'Midsole drop: 10 mm (heel: 22 mm / forefoot: 12 mm)',
      'Imported',
      'Product color: Core Black / Core Black / Pulse Lime'
    ],
    sustainability: 'This product is made with Primeblue, a high-performance recycled material made in part with Parley Ocean Plastic.',
    colors: [
      { name: 'Core Black', code: '#000000', available: true },
      { name: 'Cloud White', code: '#FFFFFF', available: true },
      { name: 'Pulse Lime', code: '#C0FF00', available: false },
      { name: 'Team Royal Blue', code: '#0044CC', available: true }
    ],
    sizes: [
      { us: '7', uk: '6.5', availability: 'in_stock' },
      { us: '7.5', uk: '7', availability: 'in_stock' },
      { us: '8', uk: '7.5', availability: 'in_stock' },
      { us: '8.5', uk: '8', availability: 'low_stock' },
      { us: '9', uk: '8.5', availability: 'in_stock' },
      { us: '9.5', uk: '9', availability: 'in_stock' },
      { us: '10', uk: '9.5', availability: 'out_of_stock' },
      { us: '10.5', uk: '10', availability: 'in_stock' },
      { us: '11', uk: '10.5', availability: 'in_stock' },
      { us: '11.5', uk: '11', availability: 'low_stock' },
      { us: '12', uk: '11.5', availability: 'in_stock' },
      { us: '12.5', uk: '12', availability: 'out_of_stock' },
      { us: '13', uk: '12.5', availability: 'in_stock' }
    ],
    images: [
      '/assets/product.png',
      '/assets/product.png',
      '/assets/product.png',
      '/assets/product.png',
      '/assets/product.png',
    ]
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    // alert(`Added to cart: ${quantity} x ${product.name} (Size: ${selectedSize.us}, Color: ${selectedColor.name})`);
  };

  return (
    <>
      <Head>
        <title>{product.name} | adidas US</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shoes" className="hover:text-black">
            Shoes
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shoes/running" className="hover:text-black">
            Running
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="sticky top-24">
            <div className="relative aspect-square mb-4 bg-gray-100">
              <Image 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                width={600}
                height={600}
                className="object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                  {product.discount}
                </div>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentImageIndex(index)}
                  className={`border-2 ${currentImageIndex === index ? 'border-black' : 'border-transparent'}`}
                >
                  <Image 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-black mb-1">{product.name}</h1>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviewCount} Reviews)</span>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold mr-3">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Color: <span className="font-normal">{selectedColor.name}</span></h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    disabled={!color.available}
                    className={`w-12 h-12 rounded-full border-2 ${selectedColor.name === color.name ? 'border-black' : 'border-gray-300'} ${!color.available ? 'opacity-40 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.code }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
            {/* <h2 className="text-lg font-medium">Size: {selectedSize ? `US ${selectedSize.us}` : 'Select Size'}</h2> */}
                
                <button className="text-sm underline">Size Guide</button>
              </div>
              {/* <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.us}
                    // onClick={() => setSelectedSize(size)}
                    disabled={size.availability === 'out_of_stock'}
                    className={`py-3 border ${
                      // selectedSize?.us === size.us 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-500'
                    } ${
                      size.availability === 'out_of_stock' 
                        ? 'opacity-40 cursor-not-allowed bg-gray-100' 
                        : ''
                    } ${
                      size.availability === 'low_stock' 
                        ? 'relative' 
                        : ''
                    }`}
                  >
                    {size.us}
                    {size.availability === 'low_stock' && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 rounded-full">!</span>
                    )}
                  </button>
                ))}
              </div>
              {selectedSize?.availability === 'low_stock' && (
                <p className="text-orange-500 text-sm mt-2">Low stock - only a few left!</p>
              )} */}
            </div>

            {/* Quantity and Add to Bag */}
            <div className="flex items-center mb-8">
              <div className="mr-4">
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                <div className="flex border border-gray-300">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 bg-gray-100"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    id="quantity" 
                    min="1" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 px-6 font-medium hover:bg-gray-800 transition-colors"
              >
                ADD TO BAG
              </button>
            </div>

            {/* Wishlist and Shipping Info */}
            <div className="flex items-center justify-between mb-8">
              <button className="flex items-center text-gray-700 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </button>
              <div className="text-sm text-gray-600">
                Free shipping over $50
              </div>
            </div>

            {/* Sustainability */}
            {product.sustainability && (
              <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm">{product.sustainability}</p>
                </div>
              </div>
            )}

            {/* Product Features */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2">Product Details</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <div className="aspect-square bg-gray-100 mb-2 relative overflow-hidden">
                  <Image 
                    src={`/assets/product1.png`} 
                    alt={`Recommendation ${item}`}
                    width={300}
                    height={300}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium">Recommended Product {item}</h3>
                <p className="text-gray-700">$129.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}