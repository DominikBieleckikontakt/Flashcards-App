import { useNavigation, useDayPicker } from "react-day-picker";

export default function CustomCaption() {
  const { currentMonth, goToMonth } = useNavigation();
  const { locale, fromDate, toDate } = useDayPicker();

  const years = [];
  const currentYear = new Date().getFullYear();
  const startYear = fromDate?.getFullYear() ?? 1900;
  const endYear = toDate?.getFullYear() ?? currentYear;

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString(locale?.code || "default", { month: "long" })
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(Number(e.target.value));
    goToMonth(newMonth);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(currentMonth);
    newMonth.setFullYear(Number(e.target.value));
    goToMonth(newMonth);
  };

  return (
    <div className="flex gap-2 justify-center items-center py-2">
      <select
        className="text-sm border px-2 py-1 rounded-md"
        value={currentMonth.getMonth()}
        onChange={handleMonthChange}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select
        className="text-sm border px-2 py-1 rounded-md"
        value={currentMonth.getFullYear()}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
