

export function timeDeliveryFunction(multiplier: number): string {
  const currentTime = new Date();
  const addMinutes = (date: Date, minutes: number) => new Date(date.getTime() + minutes * 1800000 );

  function deliveryTimesCalculated(): string {
    const deliveryTime = addMinutes(currentTime, multiplier);

    // Obter horas e minutos e formatar como string
    const hours = deliveryTime.getHours().toString().padStart(2, '0');
    const minutes = deliveryTime.getMinutes().toString().padStart(2, '0');

    const calcFinal = `${hours}:${minutes}`;
    return calcFinal;
  }

  return deliveryTimesCalculated(); // Retorna o valor calculado
}