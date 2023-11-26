function getDay(dateString) {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  console.log(new Date(dateString).getDay())
  console.log(days[new Date(dateString).getDay()])
  console.log(days[new Date(dateString).getDay() + 1])
  return days[new Date(dateString).getDay() + 1];
}
// Esto podría llevar a errores ya que los índices de días en JavaScript empiezan en 0 (Domingo)

console.log(getDay('2023-12-11')); // undefined