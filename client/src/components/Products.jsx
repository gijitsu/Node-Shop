import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../Redux/Actions/Product";

export default function Products(){
    const dispatch = useDispatch();
    const productListReducer = useSelector( (state) => state.productListReducer);
    const { loading, error, products, page, totalPages } = productListReducer;


    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);


    return(
        <div>
            {loading ? (<h1>Loading</h1>): 
            error ? (<h1>Error</h1>) : 
            (

            <>  
                <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product)=> (
                    <div key={product}>
                    <a href="#" className="group">
                    <img src={product.image} alt={product.description} className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                </a>
                </div>
                ))}
                </div>
                </div>
                </div>

                </div>
            </section>

            </>
            )}
        </div>
    );
}