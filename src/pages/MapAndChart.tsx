import React from "react";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import L from "leaflet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryData {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

const MapAndChart: React.FC = () => {

  const { data: countriesData } = useQuery<CountryData[]>({
    queryKey: ["countriesData"],
    queryFn: () => axios.get("https://disease.sh/v3/covid-19/countries").then((res) => res.data)
  });

  const { data: historicalData } = useQuery({
    queryKey: ["historicalData"],
    queryFn: () => axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then((res) => res.data)
  });

  const chartData = {
    labels: historicalData ? Object.keys(historicalData.cases) : [],
    datasets: [
      {
        label: "COVID-19 Cases",
        data: historicalData ? Object.values(historicalData.cases) : [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: number | string, index: number, ticks: any[]) {
            const value = Number(tickValue);
            if (value >= 1000000) return (value / 1000000).toString() + 'M';
            if (value >= 1000) return (value / 1000).toString() + 'K';
            return value.toString();
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800'>COVID-19 Dashboard</h1>
      <div className='mb-4 sm:mb-8 bg-white shadow-md rounded p-3 sm:p-4 lg:p-6'>
        <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4 text-gray-700'>
          Global Cases Fluctuation
        </h2>
        <div className="h-64 sm:h-80 lg:h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className='bg-white shadow-md rounded p-3 sm:p-4 lg:p-6'>
        <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4 text-gray-700'>
          COVID-19 Cases by Country
        </h2>
        <div className="h-64 sm:h-80 lg:h-96">
          <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {countriesData?.map((country: CountryData) => (
              <Marker
                key={country.country}
                position={[
                  country.countryInfo.lat,
                  country.countryInfo.long
                ]}
                icon={L.icon({
                  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              >
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold text-sm sm:text-base">{country.country}</h3>
                    <p className="text-xs sm:text-sm">Active cases: {country.active.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm">Recovered: {country.recovered.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm">Deaths: {country.deaths.toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapAndChart;