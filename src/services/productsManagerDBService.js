import ProductRepository from "../repository/productsRepository.js";

export const getProductsService = async (params) => {
    try {
<<<<<<< HEAD
        return await ProductRepository.getProducts(params);
=======

        page = page == 0 ? 1 : page;
        page = Number(page);
        limit = Number(limit)

        const skip = (page - 1) * (limit)
        const sortOrder = { 'asc': -1, 'desc': 1, }
        sort = sortOrder[sort] || null;


        try {
            if (query)  
                query = JSON.parse(decodeURIComponent(query));
        } catch (error) {
            query={}
        }


        const queryProducts = productModel.find(query).limit((limit)).skip(skip).lean()

        if (sort !== null)
            queryProducts.sort({ price: sort })

        const [products, totalDocs] = await Promise.all([queryProducts, productModel.countDocuments(query)])

        const totalPages = Math.ceil(totalDocs / (limit))
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        return {
            totalDocs,
            totalPages,
            page,
            hasNextPage,
            hasPrevPage,
            prevPage,
            nextPage,
            limit, 
            query:JSON.stringify(query),
            payload: products,

            prevLink: '',
            nextLink: '',
        }

>>>>>>> c36ba2dff0a03159adf889f151fb220a6a55dc2e
    } catch (error) {
        console.log("getProductsService => ", error);
        throw error;
    }
};

export const getProductByIdService = async (pid) => {
    try {
        return await ProductRepository.getProductById(pid);
    } catch (error) {
        console.log("getProductByIdService => ", error);
        throw error;
    }
};

export const addProductService = async (productData) => {
    try {
        return await ProductRepository.addProduct(productData);
    } catch (error) {
        console.log("addProductService => ", error);
        throw error;
    }
};

export const updateProductService = async (pid, updateData) => {
    try {
        return await ProductRepository.updateProduct(pid, updateData);
    } catch (error) {
        console.log("updateProductService => ", error);
        throw error;
    }
};

export const deleteProductService = async (pid) => {
    try {
        return await ProductRepository.deleteProduct(pid);
    } catch (error) {
        console.log("deleteProductService => ", error);
        throw error;
    }
};
