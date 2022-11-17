import './ItemListContainer.css';
import apiProducts from '../../apiEcommerce/apiEcommerce';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList/ItemList';

import { collection, getFirestore, getDocs } from "firebase/firestore";

const ItemListContainer = () => {

    const { category } = useParams();
    const [products, setProducts] = useState([]);

    const getProducts = (prods) => {
        // setTimeout(() => {
            setProducts(prods);
        // },2000);
    }

    useEffect(() => {
        getProducts(apiProducts);

        const db = getFirestore();
        const productosCollection = collection(db, 'productos');
        getDocs(productosCollection).then(snapshot => {
            console.log(snapshot.docs.map( doc => doc.data()))
        })

    },[]);

    return (
        <div className="item_list_container">
            {!category ?
                <h1 className="title_item_list_container"> Todos los productos </h1> : 
                <h1 className="title_item_list_container"> {category} </h1>
            }
            {!category ? 
                <ItemList items={products}/> : 
                <ItemList items={products.filter( product => product.category === category)}/>
            }
        </div>
    );
};

export default ItemListContainer;