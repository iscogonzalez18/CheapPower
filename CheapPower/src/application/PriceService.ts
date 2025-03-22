import { PriceFilter } from "../domain/PriceFilter";
import { PriceRepository } from "../infrastructure/PriceRepository";

export interface PriceData {
  date: string;
  hour: string;
  price: number;
}

export class PriceService {
  private repository: PriceRepository;

  constructor(repository: PriceRepository) {
    this.repository = repository;
  }

  async getLowestPriceByDate(): Promise<string> {
    try {
      const prices = await this.repository.fetchPrices();

      const lowestPrice = PriceFilter.getLowestPrice(prices);
      return lowestPrice
        ? `Hora más barata: ${lowestPrice.hour}, Precio: ${lowestPrice.price} €/kWh`
        : "No hay datos para esta fecha";
    } catch (error) {
      return "Error al obtener datos";
    }
  }
}
