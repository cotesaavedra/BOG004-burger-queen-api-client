import './Card.css';
import Counter from "../Counter/Counter.js";

const Card = ({ products, setProducts }) => {
    const returnCounter = (product, value) => {
        let productsClone = Object.assign([], products);
        productsClone.forEach(element => {
            if (element.id === product.id){
                element.quantity = value; 
            }
        });
        // console.log(productsClone)
        setProducts(productsClone);
    }
    
    return (
        products.map((product) => (
            <div data-testid='card-product' className='product' key={product.id}>
                <h6 data-testid = 'name'>{product.name}</h6>
                <p>${product.price}</p>
                <Counter amount={product.quantity} calculate={(value) => returnCounter(product, value)}></Counter>
            </div>
        ))
    )
}
export default Card;
