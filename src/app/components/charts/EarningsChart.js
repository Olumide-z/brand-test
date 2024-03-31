import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import NGNIcon from '../svgs/NGNIcon'
import USDIcon from '../svgs/USDIcon'
import GBPIcon from '../svgs/GBPIcon'

ChartJS.register(ArcElement, Tooltip, Legend)

const EarningsChart = ({ options, userToken }) => {
  const [chartData, setChartData] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('NGN')
  const [totalIncome, setTotalIncome] = useState(null)
  const [profitGrowthPercentage, setProfitGrowthPercentage] = useState(null)
  const [responseData, setResponseData] = useState(null)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
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

        const data = await response.json()
        setResponseData(data) // Update the responseData state

        if (data && data.data && data.data.wallet) {
          const currencyData = data.data.wallet

          // Extract the profit growth percentage from the initial response
          const initialProfitGrowthPercentage =
            data.data.incomePercentageIncrease[selectedCurrency]
          setProfitGrowthPercentage(initialProfitGrowthPercentage)

          let currencyBalance, currencyClearedBalance, currencyPendingBalance

          switch (selectedCurrency) {
            case 'NGN':
              currencyBalance = currencyData.balance_ngn
              currencyClearedBalance = currencyData.cleared_balance_ngn
              currencyPendingBalance = currencyData.pending_balance_ngn
              break
            case 'GBP':
              currencyBalance = currencyData.balance_gbp
              currencyClearedBalance = currencyData.cleared_balance_gbp
              currencyPendingBalance = currencyData.pending_balance_gbp
              break
            case 'USD':
              currencyBalance = currencyData.balance_usd
              currencyClearedBalance = currencyData.cleared_balance_usd
              currencyPendingBalance = currencyData.pending_balance_usd
              break
            default:
              break
          }

          const total = currencyClearedBalance + currencyPendingBalance
          setTotalIncome((total / 100).toLocaleString()) // Convert and set totalIncome

          setChartData({
            labels: ['Pending Balance', 'Cleared Balance'],
            datasets: [
              {
                label: 'Balance',
                data: [currencyPendingBalance, currencyClearedBalance],
                backgroundColor: ['#5372E7', '#FF9F24'],
                borderWidth: 1,
                cutout: '70%',
              },
            ],
          })
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchChartData()
  }, [userToken, selectedCurrency])

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency)
    setDropdownOpen(false)

    // Retrieve currency data from the API response based on the selected currency
    const currencyData = responseData.data.wallet
    const incomePercentageIncrease = responseData.data.incomePercentageIncrease

    let currencyClearedBalance, currencyPendingBalance

    switch (currency) {
      case 'NGN':
        currencyClearedBalance = currencyData.cleared_balance_ngn
        currencyPendingBalance = currencyData.pending_balance_ngn
        break
      case 'GBP':
        currencyClearedBalance = currencyData.cleared_balance_gbp
        currencyPendingBalance = currencyData.pending_balance_gbp
        break
      case 'USD':
        currencyClearedBalance = currencyData.cleared_balance_usd
        currencyPendingBalance = currencyData.pending_balance_usd
        break
      // Add cases for other currencies if needed
      default:
        currencyClearedBalance = 0
        currencyPendingBalance = 0
    }

    // Calculate the total income based on the selected currency
    const total = currencyClearedBalance + currencyPendingBalance
    setTotalIncome(total.toLocaleString())

    // Calculate the profit growth percentage based on the selected currency
    const profitGrowthPercentage = incomePercentageIncrease[currency]
    setProfitGrowthPercentage(profitGrowthPercentage)

    // Update the chart data with the new currency balances
    setChartData({
      labels: ['Pending Balance', 'Cleared Balance'],
      datasets: [
        {
          label: 'Balance',
          data: [currencyPendingBalance, currencyClearedBalance],
          backgroundColor: ['#5372E7', '#FF9F24'],
          borderWidth: 1,
          cutout: '70%',
        },
      ],
    })
  }

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart

      ctx.save()
      ctx.font = 'bold 10px sans-serif'
      ctx.fillStyle = '#999999'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        'Total Income',
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      )

      // Add the total earning number below the previous text
      ctx.font = 'bold 14px sans-serif'
      ctx.fillStyle = 'black'
      if (totalIncome !== null) {
        ctx.fillText(
          `${totalIncome}`,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y + 20
        )
      }
      ctx.restore()
    },
  }

  const chartOptions = {
    ...options,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
      },
    },
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className='flex-col items-center lg:h-[450px] md:flex-col gap-4 xl:flex-col  xl:justify-between '>
      <div className='flex justify-between items-center mb-4 xl:mb-[30px]'>
        <div className='flex-col gap-y-2 lg:ml-0 '>
          <h2 className='font-open font-[700] text-[16px] leading-[21.79px] text-[#333333]'>
            Earnings
          </h2>
          <p className='text-[12px] text-[#999999] font-open font-[400] leading-[16.34px]'>
            Total profit growth of {profitGrowthPercentage}%
          </p>
        </div>
        <div className=''>
          <div
            className='selected-currency flex items-center cursor-pointer'
            onClick={toggleDropdown}>
            {selectedCurrency === 'NGN' && <NGNIcon />}
            {selectedCurrency === 'GBP' && <GBPIcon />}
            {selectedCurrency === 'USD' && <USDIcon />}
          </div>
          {dropdownOpen && (
            <div className='absolute w-32 p-2 right-[10px] xl:right-[10px] bg-white shadow-lg mt-2 rounded-md overflow-hidden z-10 transition-all duration-300'>
              <div
                onClick={() => handleCurrencyChange('NGN')}
                className='cursor-pointer px-4 py-2 flex gap-x-3 hover:bg-gray-100'>
                <NGNIcon /> <h3>NGN</h3>
              </div>
              <hr className='my-1 w-[92px] border-[1px] border-[rgb(228,228,228)] mx-auto' />
              <div
                onClick={() => handleCurrencyChange('GBP')}
                className='cursor-pointer px-4 py-2 flex gap-x-3 hover:bg-gray-100'>
                <GBPIcon /> <h3>GBP</h3>
              </div>
              <hr className='my-1 w-[92px] border-[1px] border-[rgb(228,228,228)] mx-auto' />
              <div
                onClick={() => handleCurrencyChange('USD')}
                className='cursor-pointer px-4 py-2 flex gap-x-3 hover:bg-gray-100'>
                <USDIcon /> <h3>USD</h3>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center w-full mx-auto md:w-[300px] lg:w-[350px] xl:w-[300px] xl:h-[400px] '>
        {chartData && (
          <Doughnut
            data={chartData}
            options={chartOptions}
            plugins={[textCenter]}
          />
        )}
      </div>
    </div>
  )
}

export default EarningsChart
