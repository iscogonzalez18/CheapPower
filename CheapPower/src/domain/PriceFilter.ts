import { PriceData } from "../application/PriceService";

export class PriceFilter {
  static getLowestPrice(prices: PriceData[]): PriceData | null {
    if (prices.length === 0) return null;
    return prices.reduce((min, price) => (price.price < min.price ? price : min));
  }
}
