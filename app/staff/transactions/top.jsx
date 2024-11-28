import React, { useMemo, useState } from 'react';

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [variant, setVariant] = useState('');

  // Placeholder for findCategory
  const findCategory = products.map(product => product.category);

  const FilterItemCode = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((item) => {
      const itemCode = item?.item_code?.toLowerCase() || '';
      const search = searchTerm?.toLowerCase() || '';
      return itemCode.includes(search);
    });
  }, [products, searchTerm]);

  const filteredItemDetails =
    FilterItemCode.length > 0
      ? {
          category: findCategory?.length > 0 ? findCategory[0] : '',
          item_no: searchTerm,
          item_name: FilterItemCode[0]?.name || '',
          measurement: FilterItemCode[0]?.unit || '',
          variants: FilterItemCode[0]?.variants || '',
          unit_cost: FilterItemCode[0]?.price || 0,
          quantity: 1,
          sub_total: (FilterItemCode[0]?.price || 0) * 1,
          total_amount: (FilterItemCode[0]?.price || 0) * 1,
          amount_paid: (FilterItemCode[0]?.price || 0) * 1,
        }
      : {};

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Input
        autoFocus
        type="search"
        variant="bordered"
        color="primary"
        size="sm"
        onChange={handleSearch}
        label={<span className="text-black dark:text-white">Item Code</span>}
      />
      <ul>
        {FilterItemCode.map((item) => (
          <li key={item.id}>{item.item_code}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
