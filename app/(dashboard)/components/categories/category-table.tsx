import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";
import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit, FiEdit2, FiTrash2 } from "react-icons/fi";

// const categoryData = [
//     {
//         name: "Running",
//         imageUrl:"/images/categories/category-running.png",
//         description:"Lorem ipsum"
//     },
//     {
//          name: "Football",
//         imageUrl:"/images/categories/category-football.png",
//         description:"Lorem ipsum"
//     },
   
// ]

type TCategoryTableProps ={
    categories: Category[];
    onEdit:(category: Category) => void;
    onDelete:(id: string) => void
}

const CategoryTable =({categories, onEdit, onDelete}:TCategoryTableProps) => {
    return(
        <div className="bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Category Name</th>
                        <th className="px-6 py-4 font-semibold">Description</th>
                        <th className="px-6 py-4 font-semibold">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((data,index) =>(
                            <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                <td className="px-6 py-4 font-medium">
                                    <div className="flex gap-2 items-center">
                                        <div className="aspec-square bg-gray-100 rounded-md">
                                        <Image 
                                        src={getImageUrl(data.imageUrl)} 
                                        width={52} 
                                        height={52} 
                                        alt={data.name} 
                                        className="aspect-square object-contain"/>
                                        </div>
                                        <span>{data.name}</span>
                                    </div>
                                </td>
                                 <td className="px-6 py-4 font-medium">
                                    {data.description}
                                </td>
                                <td className="px-6 py-7.5 self-center flex item-center gap-3 text-gray-600">
                                    <button onClick={() => onEdit?.(data)} 
                                    className=" cursor-pointer p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"><FiEdit2 size={20}/>
                                    </button>
                                     <button onClick={() => onDelete?.(data._id)} 
                                     className=" cursor-pointer p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"><FiTrash2 size={20}/>
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
export default CategoryTable;