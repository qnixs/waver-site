const rows = [
  {
    type: 'Розетка заподлицо (врезная)',
    location: 'стены: фартуки, ванные, керамогранит',
    highlight: true,
  },
  {
    type: 'Выдвижной блок',
    location: 'столешницы',
    highlight: false,
  },
  {
    type: 'Поворотная розетка',
    location: 'декоративные решения, выступ остаётся',
    highlight: false,
  },
  {
    type: 'Розетка с крышкой',
    location: 'улица, влагозащита',
    highlight: false,
  },
]

export function ComparisonTable() {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Вид</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-700">Где используется</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.type}
              className={`border-b border-gray-100 last:border-0 ${
                row.highlight ? 'bg-gray-900 text-white' : ''
              }`}
            >
              <td className="px-4 py-3 font-medium">{row.type}</td>
              <td className={`px-4 py-3 ${row.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                {row.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
