"use client"

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { use, useEffect, useState } from "react";
import { Product } from "@/app/types";
import { deleteProduct, getAllProducts } from "@/app/services/product.services";
import { toast } from "react-toastify";
import DeleteModal from "../../ui/modal-delete";

const ProductManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProducts] = useState<Product[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] =useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productToDeleteId, categoryToDeleteId] = useState("");

    const fetchProducts = async () => {
        try{
            const data = await getAllProducts();
            if (data){
                setProducts(data)
            }
        } catch(error){
            console.error("Failed to fetch products",error)
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true)
    }

    const handleDelete = (id:string) =>{
        categoryToDeleteId(id);
        setIsDeleteModalOpen(true);
    }

    const handleDeleteConfirm = async() => {
        if(!productToDeleteId) return;
        try{
            await deleteProduct(productToDeleteId);
            fetchProducts();
            toast.success("Product deleted successfully");
            setIsDeleteModalOpen(false);
            categoryToDeleteId("");
        } catch(error){
            console.error("Failed to delete product",error)
            toast.error("Failed to delete product");
        }
    };

    useEffect(() =>{
        fetchProducts();
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);

    };
    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                <h1 className="font-bold text-2xl">Product Management</h1>
                <p className="opacity-50">Manage your inventory, prices and stock.</p>
                </div>
                <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
                    <FiPlus size={24}/>
                    Add Product
                    </Button>
            </div>
            <ProductTable
            products={product} 
            onEdit={handleEdit} 
            onDelete={handleDelete}/>
            <ProductModal 
            product={selectedProduct}
            onSucces={fetchProducts} 
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            /> 
            <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() =>setIsDeleteModalOpen(false)} 
            onConfirm={handleDeleteConfirm}/>
        </div>
    );
};

export default ProductManagement