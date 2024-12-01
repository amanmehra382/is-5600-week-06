import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [filteredProducts, setFilteredProducts] = useState(data); // Filtered dataset
  const totalPages = Math.ceil(filteredProducts.length / limit); // Total pages

  // Calculate visible products based on the current page
  const getVisibleProducts = () => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    return filteredProducts.slice(start, end);
  };

  const [products, setProducts] = useState(getVisibleProducts());

  // Update products when filteredProducts or currentPage changes
  useEffect(() => {
    setProducts(getVisibleProducts());
  }, [currentPage, filteredProducts]);

  // Handle search functionality
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Handle pagination
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={handleSearch} />
      <div className="mt2 mb2">
        {/* Render Cards */}
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={goToPreviousPage}
          disabled={currentPage === 1} // Disable if on the first page
        />
        <Button
          text="Next"
          handleClick={goToNextPage}
          disabled={currentPage === totalPages} // Disable if on the last page
        />
      </div>
    </div>
  );
};

export default CardList;
