import React from 'react';
import styles from "../stylesheets/Main.module.css";
import { useState } from 'react';
import { supabase } from '../supabase-client';
import { useAuth } from '../contexts/AuthContext';

const AddProduct = ({addOpen, setAddOpen, categories, category, setCategory}) => {

  const {user} = useAuth();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState();
  const [productImagePath, setProductImagePath] = useState();

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  const uploadImage = async(e) => {
    e.preventDefault();
    let file = productImage;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.uid}_${Date.now()}.${fileExt}`;
    const filePath = `${user.uid}/${fileName}`;

    const {data, error} = await supabase
    .storage
    .from('bucket')
    .upload(filePath, file);

    const {data: publicUrlData} = supabase.storage
    .from('bucket')
    .getPublicUrl(filePath);

    if(publicUrlData){
      setProductImagePath(publicUrlData.publicUrl);
      alert("Uploaded successfully");
    }
  }

  const handleSubmit = async() => {
    const {data} = await supabase
    .from('Products')
    .insert({
      productName: productName,
      productPrice: productPrice,
      productImage: productImagePath,
      productCategory: category,
    })
  }

  return (
    <div className={styles.addProductBg}>
        <button onClick={() => {setAddOpen(!addOpen)}}>Close</button>
        <form className={styles.addProductForm}>
           <div className={styles.inputs}>
                <div className={styles.imageInput}>
                    <div className={styles.imageThumbnail}>
                        <img src={productImage ? URL.createObjectURL(productImage) : ""} />
                    </div>
                    <input type="file" accept="image/png, image/jpeg" onChange={(e) => setProductImage(e.target.files[0])}/>
                    <button onClick={uploadImage}>Upload image</button>
                </div>
                <div className={styles.generalInfo}>
                    <label htmlFor='productName'>Name of your product</label>
                    <input type="text" id="productName" onChange={(e) => {setProductName(e.target.value)}}/>
                    <label htmlFor='productPrice'>Name your price</label>
                    <input type="text" id="productPrice" onChange={(e) => {setProductPrice(e.target.value)}}/>
                    <label htmlFor='productName'>Product category</label>
                    <select id="categoryDropdown" value={category} onChange={handleChange}>
                        {categories.map((category)=> {
                            return <option value={category.value}>{category.label}</option>
                        })}
                    </select>
                </div>
                <div className={styles.productDescription}>
                    <label htmlFor='productDescription'>Describe your product</label>
                    <input type="text" id="productDescription" onChange={(e) => {setProductDescription(e.target.value)}}/>
                </div>
           </div>
           <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default AddProduct