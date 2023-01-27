import React from "react"
import { Chart as ChartJS, BarElement, CategoryScale,LinearScale} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const PieChart = () => {
    return (
        <div>
            <Bar>
            </Bar>
        </div>
        )
}

export default PieChart