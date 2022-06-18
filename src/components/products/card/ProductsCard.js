import Counter from '../Counter/Counter.js';
import './ProductsCard.css';


const ProductCard = ({ products, setProducts }) => {

    const returnCounter = (product, value) => {
        let productsClone = Object.assign([], products); // clon del estado para actualizar su información
        productsClone.forEach(element => {
            if (element.id === product.id){
                element.quantity = value; 
            }
        });
        // actualizar el quantity del producto
        setProducts(productsClone);
    }
    
    return (
        products.map((product) => (
            <div className='product' key={product.id}>
                <h6>{product.name}</h6>
                <p>${product.price}</p>
                <Counter amount={product.quantity} retorno={(valor) => returnCounter(product, valor)}></Counter>                
            </div>
        ))
    )
}
export default ProductCard;