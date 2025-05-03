import React, { useContext, useState } from "react"; // Import useState
import { ProductContext } from "../contexts/ProductContext.jsx";
import Product from "../components/Product";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar"; // Import SearchBar

const Home = () => {
	// get products from product context
	const { products } = useContext(ProductContext);
	// Add state for search term
	const [searchTerm, setSearchTerm] = useState("");

	// Handle search input changes
	const handleSearch = (value) => {
		setSearchTerm(value);
	};

	// Filter products based on search term
	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<Hero />
			<section className="py-20" id="explore-section">
				<div className="container mx-auto">
					<h1 className="text-3xl font-semibold mb-10 text-center">
						Explore Our Products
					</h1>
					{/* Add SearchBar component */}
					<SearchBar onSearch={handleSearch} />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
						{/* Map over filteredProducts instead of products */}
						{filteredProducts.map((product) => {
							return <Product product={product} key={product.id} />;
						})}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
