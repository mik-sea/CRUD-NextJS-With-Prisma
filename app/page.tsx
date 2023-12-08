import AddProduct from "./products/addProduct";
import DeleteProduct from "./products/deleteProduct";
import UpdateProduct from "./products/updateProduct";
import { PrismaClient } from "@prisma/client";

type Product = {
    id: number;
    title: string;
    price: number;
}

async function getProducts(){

    const prisma = new PrismaClient();
    const allProducts = await prisma.products.findMany();
    return allProducts
}

export default async function ProductList(){
    const products: Product[] = await getProducts();
    return(
        <div className="container mx-auto">
            <h1 className="text-center py-10 text-[20px] font-bold text-[#fff]">Database Gudang</h1>
            <div className="my-10 mx-10">
                <div className="py-2">
                    <AddProduct/>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                {products.map((product,index)=>(
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td className="flex gap-4">
                            <UpdateProduct {...product}/>
                            <DeleteProduct {...product}/>
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}