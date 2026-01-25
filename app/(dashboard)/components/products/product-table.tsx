import { getImageUrl } from "@/app/lib/api";
import { Product } from "@/app/types";
import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit, FiEdit2, FiTrash2 } from "react-icons/fi";

// const productData = [
//     {
//         name: "SportOn Product 1",
//         imageUrl:"/images/products/product-1.png",
//         category:"Running",
//         price: 290000,
//         stock:3,
//     },
//     {
//         name: "SportOn Product 2",
//         imageUrl:"/images/products/product-2.png",
//         category:"Running",
//         price: 290000,
//         stock:4,
//     },
//     {
//         name: "SportOn Product 3",
//         imageUrl:"/images/products/product-3.png",
//         category:"Running",
//         price: 220000,
//         stock:5,
//     },
// ]

type TProductsTableProps = {
    products: Product [];
    onDelete?:(id:string)=> void;
    onEdit?:(product:Product)=> void;
}

const ProductTable =({products, onDelete,onEdit}:TProductsTableProps) => {
    return(
        <div className="bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Product</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold">Price</th>
                        <th className="px-6 py-4 font-semibold">Stock</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((data,index) =>(
                            <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
                                <td className="px-6 py-4 font-medium">
                                    <div className="flex gap-2 items-center">
                                        <div className="aspec-square bg-gray-100 rounded-md">
                                        <Image src={getImageUrl(data.imageUrl)} 
                                        width={52} 
                                        height={52} 
                                        alt={data.name} 
                                        className="aspect-square object-contain"/>
                                        </div>
                                        <span>{data.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    <div className="rounded-md bg-gray-200 px-2 py-1 w-fit">
                                        {data.category.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {priceFormatter(data.price)}
                                </td>
                                 <td className="px-6 py-4 font-medium">
                                    {data.stock} units
                                </td>
                                <td className="px-6 py-7.5 self-center flex items-center gap-3 text-gray-600">
                                    <button onClick={() => onEdit?.(data)} 
                                    className=" cusrsor-pointer p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"><FiEdit2 size={20}/>
                                    </button>
                                     <button onClick={() => onDelete?.(data._id)} 
                                     className=" cusrsor-pointer p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"><FiTrash2 size={20}/>
                                    </button>
                                </td> 
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ProductTable;