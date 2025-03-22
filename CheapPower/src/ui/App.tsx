import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { APIPriceRepository } from "../infrastructure/PriceRepository";
import { PriceService } from "../application/PriceService";

// Inicializar el repositorio con la API deseada
// semana anterior
const startDate = new Date();
startDate.setDate(startDate.getDate() - 7);  // 7 días antes
const endDate = new Date(startDate);
endDate.setDate(endDate.getDate() + 2);  // 1 día antes

const priceRepository = new APIPriceRepository(startDate, endDate);
const priceService = new PriceService(priceRepository);

export default function App() {
  const [precioMin, setPrecioMin] = useState<string | null>(null);

  const buscarPrecio = async () => {
    const resultado = await priceService.getLowestPriceByDate();
    setPrecioMin(resultado);
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta el precio más barato de la luz</Text>
      <Button title="Buscar" onPress={buscarPrecio} />
      {precioMin && <Text style={styles.result}>{precioMin}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
