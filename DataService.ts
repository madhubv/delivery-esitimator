import { Product, PincodeInfo } from '../types';
import { readCSVFile, parseCSVData } from '../utils/csvParser';

export interface Stock {
  product_id: string;
  warehouse_id: string;
  quantity: number;
}

export interface WarehouseStock {
  [productId: string]: {
    quantity: number;
    warehouse_id: string;
  };
}

export class DataService {
  private products: Product[] = [];
  private stocks: WarehouseStock = {};
  private pincodes: Map<string, PincodeInfo> = new Map();
  
  async initialize(): Promise<void> {
    await Promise.all([
      this.loadProducts(),
      this.loadStocks(),
      this.loadPincodes()
    ]);
  }
  
  private async loadProducts(): Promise<void> {
    const data = await readCSVFile('products.csv');
    const productHeaders = ['id', 'name', 'price', 'category'];
    const parsedProducts = parseCSVData<Product>(productHeaders, data);
    
    this.products = parsedProducts.map(p => ({
      ...p,
      price: Number(p.price),
      inStock: false // Will be updated when stocks are loaded
    }));
  }
  
  private async loadStocks(): Promise<void> {
    const data = await readCSVFile('stocks.csv');
    const stockHeaders = ['product_id', 'warehouse_id', 'quantity'];
    const stocks = parseCSVData<Stock>(stockHeaders, data);
    
    stocks.forEach(stock => {
      this.stocks[stock.product_id] = {
        quantity: Number(stock.quantity),
        warehouse_id: stock.warehouse_id
      };
    });
    
    // Update product stock status
    this.products = this.products.map(product => ({
      ...product,
      inStock: (this.stocks[product.id]?.quantity ?? 0) > 0
    }));
  }
  
  private async loadPincodes(): Promise<void> {
    const data = await readCSVFile('pincodes.csv');
    const pincodeHeaders = ['pincode', 'provider', 'region', 'warehouse_id'];
    const pincodes = parseCSVData<PincodeInfo>(pincodeHeaders, data);
    
    pincodes.forEach(pincode => {
      this.pincodes.set(pincode.pincode, pincode);
    });
  }
  
  getProducts(): Product[] {
    return this.products;
  }
  
  getPincodeInfo(pincode: string): PincodeInfo | undefined {
    return this.pincodes.get(pincode);
  }
  
  isProductAvailableInWarehouse(productId: string, warehouseId: string): boolean {
    const stock = this.stocks[productId];
    return stock?.warehouse_id === warehouseId && stock.quantity > 0;
  }
}