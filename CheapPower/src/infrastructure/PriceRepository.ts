import { PriceData } from "../application/PriceService";

export interface PriceRepository {
  fetchPrices(): Promise<PriceData[]>;
}

export class APIPriceRepository implements PriceRepository {
  private apiUrl: string;

  constructor(startDate: Date, endDate: Date) {
    // Formateamos las fechas a ISO 8601 sin segundos
    const startDateTime = this.formatDateToISO(startDate, "00:00");
    const endDateTime = this.formatDateToISO(endDate, "23:59");

    // Construimos la URL dinámica
    this.apiUrl = `https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${startDateTime}&end_date=${endDateTime}&time_trunc=day&geo_limit=ccaa&geo_id=13`;
  }

  async fetchPrices(): Promise<PriceData[]> {
    console.log(`Fetching prices from ${this.apiUrl}`);
    const response = await fetch(this.apiUrl);
    console.log(`Response: ${response.status}`);
    return await response.json();
  }

  // Función para formatear la fecha en el formato ISO 8601 sin segundos
  private formatDateToISO(date: Date, time: string): string {
    const formattedDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    formattedDate.setHours(hours, minutes);
    // Formateamos la fecha a ISO 8601 sin segundos YYYY-MM-DDTHH:MM
    return formattedDate.toISOString().slice(0, 16);
  }
}
