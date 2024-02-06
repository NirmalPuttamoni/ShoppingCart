import { useEffect } from "react";

const Meta = ({ title }) => {
  useEffect(() => {
    // Set the meta tags
    document.title = title;

    // Cleanup function
    return () => {
      // Reset the meta tags to their default values
      document.title = "Welcome To ShoppingCart";
    };
  }, [title]); // These are the dependencies

  return null; // No need to return anything
};

Meta.defaultProps = {
  title: "Welcome To ShoppingCart",
  description: "We sell the best products for cheap",
  keywords:
    "electronics, buy electronics, cheap electroincs,clothing, jewellery",
};

export default Meta;
