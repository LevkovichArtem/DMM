'use client'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'

type Employee = {
  Name: string
  Role: string
  Location: string
  Unit: string
  'Allocation (%)': number
  'Cost (PLN)': number
  'Revenue (PLN)': number
  Month: string
}

export default function HomePage() {
  const [data, setData] = useState<Employee[]>([])

  useEffect(() => {
    fetch('/data/employees.csv')
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: true })
        setData(parsed.data as Employee[])
      })
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Delivery Metrix Monitor</h1>
      <table className="table-auto w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            {[
              'Name', 'Role', 'Location', 'Unit', 'Allocation (%)',
              'Cost (PLN)', 'Revenue (PLN)', 'Profit (PLN)', 'Month'
            ].map(col => (
              <th key={col} className="px-3 py-2 border">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((emp, idx) => {
            const profit =
              Number(emp['Revenue (PLN)'] || 0) - Number(emp['Cost (PLN)'] || 0)
            return (
              <tr key={idx} className="border-t">
                <td className="px-3 py-1 border">{emp.Name}</td>
                <td className="px-3 py-1 border">{emp.Role}</td>
                <td className="px-3 py-1 border">{emp.Location}</td>
                <td className="px-3 py-1 border">{emp.Unit}</td>
                <td className="px-3 py-1 border text-right">{emp['Allocation (%)']}</td>
                <td className="px-3 py-1 border text-right">{emp['Cost (PLN)']}</td>
                <td className="px-3 py-1 border text-right">{emp['Revenue (PLN)']}</td>
                <td className="px-3 py-1 border text-right">{profit}</td>
                <td className="px-3 py-1 border">{emp.Month}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
