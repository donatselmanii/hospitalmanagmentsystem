import express from "express";
import { 
    SaveProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    InsertOrder, 
    InsertOrderDetail, 
    getOrderID,
    Search,
    SearchByCode,
    getProductsByIds,
    updateStatusCode,
    getCompanies,
    getProductsInPage,
    SearchProducts,
    SearchProductCategory,
    SearchCompanyCategory,
    get10MostSelled,
    getOrders,
    getOrderById,
    UpdateStatus,
    MyOrders,
 } from "../Controllers/EpharmController.js";

const router = express.Router();

router.post('/', SaveProduct);

router.get('/', getProducts);

router.get('/ProductsPage', getProductsInPage);

router.get('/getbyid/:id', getProductById);

//router.get('/getproductdetails/:encodedIds', getProductsByIds);

router.get('/SearchByCode', SearchByCode);

router.get('/getProductsByIds', getProductsByIds);

router.patch('/update/:id', updateProduct);

router.delete('/delete/:id', deleteProduct);

router.post('/Order', InsertOrder);

router.post('/OrderDetail', InsertOrderDetail);

router.get('/latestOrder/:idnum', getOrderID);

router.get('/products/find', Search);

router.put("/updateCodeStatus/:code", updateStatusCode); 

router.get('/Companies', getCompanies);

router.get('/searchProducts', SearchProducts);

router.get('/category/:categoryName', SearchProductCategory);

router.get('/company-category/:companyCategoryName',SearchCompanyCategory);

router.get('/10MostSelled/', get10MostSelled);

router.get('/orders', getOrders);

router.get('/orderdetail/:orderId', getOrderById);

router.put('/orders/:orderId', UpdateStatus);

router.get('/myorders/:idnum', MyOrders);


export default router;