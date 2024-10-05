import { create } from 'zustand';

// from zustand documentation👇
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    //Let's create a function so that will create newProduct
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill in all fields."}
        }
        //if we are in this step we do have a new product will all properties
        //we can have "http://localhost:5000" prefix by doing some setting in vite config
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }) 
        const data = await res.json();
        // set state
        set((state) => ({ products: [...state.products, data.data]}));
        return { success: true, message: "Product created successfully"}
    },
    //function to fetch all products
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },
    //function to delete product
    deleteProduct: async(pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        //if there is no success
        if (!data.success) return {success: false, message: data.message}
        //if we are in this step mean we have data.success: true now we can goahead and set our products
        set((state) => ({ products: state.products.filter((p) => p._id !== pid)}));
        return {success: true, message: data.message}
    },
    // function to update the product
    updateProduct: async(pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message}
        //set 
        set((state) => ({
            products: state.products.map((p) => p._id === pid ? data.data : p)
        }))
        return {success: true, message: data.message}
    }
}))

