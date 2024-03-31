import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'

const SalesChart = () => {
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  })

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Ensure this code only runs in the browser environment
        if (typeof window !== 'undefined') {
          const userToken = localStorage.getItem('userToken')
          const response = await fetch(
            'https://love.thegoldscarf.com/api/brand/dashboard/statistics',
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
          if (!response.ok) {
            throw new Error('Failed to fetch chart data')
          }
          const { data } = await response.json()
          // Extracting labels and data from totalOrderPriceCurrentWeek
          const labels = Object.keys(data.totalOrderPriceCurrentWeek)
          const prices = Object.values(data.totalOrderPriceCurrentWeek).map(
            (price) => price.USD // Assuming you want to use USD prices
          )

          setChartData({
            labels,
            data: prices,
          })
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchChartData()
  }, [])

  useEffect(() => {
    // Check if chartData is not empty before rendering the chart
    if (chartData.labels.length > 0 && chartData.data.length > 0) {
      const ctx = chartRef.current.getContext('2d')
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Total Sales',
              data: chartData.data,
              fill: false,
              borderColor: '#DB9E04',
              tension: 0.5,
              padding: 10,
              backgroundColor: 'rgba(255, 255, 0, 0.2)', // Light yellow color for the filled region
              fill: true, // Fill the region under the line
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: 'top', // Position the legend at the top of the chart
              align: 'start', // Align the legend to the start (left)
              labels: {
                boxWidth: 0, // Set the width of the legend item box to 0 to remove the border
                padding: 0, // Set the padding of the legend item to 0 to remove spacing around the text
              },
            },
          },
        },
      })

      return () => {
        myChart.destroy()
      }
    }
  }, [chartData])

  const handleChartOptionChange = (option) => {
    // Logic to update chart data based on the selected option
    // This logic remains the same as before
    // ...
  }

  return (
    <div className='relative bg-white p-[10px]  lg:h-[450px] rounded-[10px]'>
      <div>
        <canvas className='mt-2' ref={chartRef}></canvas>
        <div>
          <select
            onChange={(e) => handleChartOptionChange(e.target.value)}
            className='absolute top-[10px] right-3 text-[#D4D4D4] text-[10px] border-[1px] border-solid border-gray-400
            rounded p-1'>
            <option className='' value='lastWeek'>
              Last Week
            </option>
            <option className='' value='currentWeek'>
              Current Week
            </option>
            <option className='' value='dailyChart'>
              Daily Chart
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SalesChart
