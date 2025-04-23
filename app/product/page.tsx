"use client";

// pages/products.js
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    productType: [],
    sport: [],
    brand: [],
    color: [],
    size: [],
  });

  // Mock product data (in a real application, this would come from an API)
  const products = [
    {
      id: 'ultraboost-light',
      name: 'Ultraboost Light Running Shoes',
      category: 'running',
      gender: 'men',
      price: 190.00,
      originalPrice: 220.00,
      discount: '15% OFF',
      isNew: false,
      colors: ['black', 'white', 'blue'],
      rating: 4.8,
      reviewCount: 126,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'samba-og',
      name: 'Samba OG Shoes',
      category: 'originals',
      gender: 'unisex',
      price: 100.00,
      originalPrice: null,
      discount: null,
      isNew: false,
      colors: ['white', 'black'],
      rating: 4.9,
      reviewCount: 2156,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'nmd-r1',
      name: 'NMD_R1 Shoes',
      category: 'originals',
      gender: 'women',
      price: 150.00,
      originalPrice: null,
      discount: null,
      isNew: true,
      colors: ['pink', 'gray', 'white'],
      rating: 4.7,
      reviewCount: 89,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'stan-smith',
      name: 'Stan Smith Shoes',
      category: 'originals',
      gender: 'unisex',
      price: 100.00,
      originalPrice: null,
      discount: null,
      isNew: false,
      colors: ['white', 'green', 'navy'],
      rating: 4.9,
      reviewCount: 3421,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'ultraboost-1',
      name: 'Ultraboost 1.0 Shoes',
      category: 'running',
      gender: 'men',
      price: 190.00,
      originalPrice: null,
      discount: null,
      isNew: false,
      colors: ['black', 'gray'],
      rating: 4.8,
      reviewCount: 542,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'forum-low',
      name: 'Forum Low Shoes',
      category: 'originals',
      gender: 'women',
      price: 100.00,
      originalPrice: null,
      discount: null,
      isNew: false,
      colors: ['white', 'blue'],
      rating: 4.7,
      reviewCount: 231,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'superstar',
      name: 'Superstar Shoes',
      category: 'originals',
      gender: 'unisex',
      price: 100.00,
      originalPrice: null,
      discount: null,
      isNew: false,
      colors: ['white', 'black'],
      rating: 4.9,
      reviewCount: 5642,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'adizero-sl',
      name: 'Adizero SL Running Shoes',
      category: 'running',
      gender: 'men',
      price: 120.00,
      originalPrice: 140.00,
      discount: '15% OFF',
      isNew: true,
      colors: ['black', 'orange', 'blue'],
      rating: 4.6,
      reviewCount: 87,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'gazelle',
      name: 'Gazelle Shoes',
      category: 'originals',
      gender: 'women',
      price: 100.00,
      originalPrice: null,
      discount: null,
      isNew: false,
      colors: ['black', 'pink', 'blue'],
      rating: 4.8,
      reviewCount: 1245,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'predator-edge',
      name: 'Predator Edge+ Firm Ground Boots',
      category: 'soccer',
      gender: 'men',
      price: 280.00,
      originalPrice: null,
      discount: null,
      isNew: true,
      colors: ['red', 'black'],
      rating: 4.5,
      reviewCount: 67,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'campus-00s',
      name: 'Campus 00s Shoes',
      category: 'originals',
      gender: 'unisex',
      price: 100.00,
      originalPrice: null,
      discount: null,
      isNew: true,
      colors: ['green', 'black', 'brown'],
      rating: 4.7,
      reviewCount: 432,
      image: '/api/placeholder/400/400',
    },
    {
      id: 'adilette-slides',
      name: 'Adilette Slides',
      category: 'sandals',
      gender: 'unisex',
      price: 35.00,
      originalPrice: 45.00,
      discount: '20% OFF',
      isNew: false,
      colors: ['black', 'white', 'pink'],
      rating: 4.8,
      reviewCount: 3421,
      image: '/api/placeholder/400/400',
    },
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      case 'rating':
        return b.rating - a.rating;
      default: // 'featured'
        return 0; // Keep original order
    }
  });

  // Filter options
  const filterOptions = {
    gender: ['Men', 'Women', 'Unisex', 'Kids'],
    productType: ['Shoes', 'Clothing', 'Accessories'],
    sport: ['Running', 'Soccer', 'Basketball', 'Training', 'Outdoor'],
    brand: ['Originals', 'Sportswear', 'Performance', 'Terrex'],
    color: ['Black', 'White', 'Blue', 'Red', 'Green', 'Pink', 'Gray', 'Brown'],
    size: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  };

  // Toggle a filter selection
  // const toggleFilter = (category: string, value: string) => {
  //   setSelectedFilters(prev => {
  //     if (prev[category].includes(value)) {
  //       return {
  //         ...prev,
  //         [category]: prev[category].filter((v: any) => v !== value)
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         [category]: [...prev[category], value]
  //       };
  //     }
  //   });
  // };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      gender: [],
      productType: [],
      sport: [],
      brand: [],
      color: [],
      size: [],
    });
    setPriceRange([0, 300]);
    setSelectedCategory('all');
  };

  // Categories for the category filter
  const categories = [
    { id: 'all', label: 'All Shoes' },
    { id: 'running', label: 'Running' },
    { id: 'originals', label: 'Originals' },
    { id: 'soccer', label: 'Soccer' },
    { id: 'sandals', label: 'Slides & Sandals' },
  ];

  return (
    <>
      <Head>
        <title>All Products | adidas US</title>
        <meta name="description" content="Shop the latest adidas shoes, clothing and accessories." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">All Products</h1>
          <p className="text-gray-500 mt-2">
            {sortedProducts.length} products
          </p>
        </div>

        {/* Desktop Filters and Grid Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-64 mr-8">
            <div className="mb-8">
              <h2 className="font-bold mb-4">CATEGORIES</h2>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`text-sm hover:underline ${selectedCategory === category.id ? 'font-bold' : ''}`}
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h2 className="font-bold mb-4">PRICE</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Filter Sections */}
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category} className="mb-8">
                <h2 className="font-bold mb-4">{category.toUpperCase()}</h2>
                <ul className="space-y-2">
                  {options.map(option => (
                    <li key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${category}-${option}`}
                        // checked={selectedFilters[category].includes(option)}
                        // onChange={() => toggleFilter(category, option)}
                        className="mr-2"
                      />
                      <label htmlFor={`${category}-${option}`} className="text-sm">
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <button
              onClick={resetFilters}
              className="text-sm underline"
            >
              Clear All Filters
            </button>
          </div>

          {/* Mobile Filter Button and Sort */}
          <div className="lg:hidden flex justify-between mb-4">
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="flex items-center text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filter
            </button>

            <div className="flex items-center">
              <label htmlFor="mobile-sort" className="mr-2 text-sm">Sort:</label>
              <select
                id="mobile-sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="text-sm border-b border-black"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters Drawer */}
          {filtersVisible && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black opacity-50" onClick={() => setFiltersVisible(false)}></div>
              <div className="absolute inset-y-0 left-0 w-80 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button onClick={() => setFiltersVisible(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">CATEGORIES</h3>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category.id}>
                        <button
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setFiltersVisible(false);
                          }}
                          className={`text-sm hover:underline ${selectedCategory === category.id ? 'font-bold' : ''}`}
                        >
                          {category.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">PRICE</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Filter Sections */}
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category} className="mb-6">
                    <h3 className="font-bold mb-2">{category.toUpperCase()}</h3>
                    <ul className="space-y-2">
                      {options.map(option => (
                        <li key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-${category}-${option}`}
                            // checked={selectedFilters[category].includes(option)}
                            // onChange={() => toggleFilter(category, option)}
                            className="mr-2"
                          />
                          <label htmlFor={`mobile-${category}-${option}`} className="text-sm">
                            {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 border border-black text-sm"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setFiltersVisible(false)}
                    className="px-4 py-2 bg-black text-white text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Sort Options */}
            <div className="hidden lg:flex justify-end mb-6">
              <div className="flex items-center">
                <label htmlFor="desktop-sort" className="mr-2 text-sm">Sort By:</label>
                <select
                  id="desktop-sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="text-sm border-b border-black"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedProducts.map(product => (
                <Link href={`/product/${product.id}`} key={product.id} className="group">
                  <div className="relative aspect-square bg-gray-100 mb-2 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold">
                        {product.discount}
                      </div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold">
                        NEW
                      </div>
                    )}
                    <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm sm:text-base truncate">{product.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)} • {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}
                      </p>
                      
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                      {product.originalPrice && (
                        <p className="text-gray-500 text-sm line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Products Found */}
            {sortedProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-1">Try changing your filters or search terms.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-black text-white text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {sortedProducts.length > 0 && (
              <div className="mt-12 text-center">
                <button className="px-8 py-3 border border-black font-medium hover:bg-black hover:text-white transition-colors">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}