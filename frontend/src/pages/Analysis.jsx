import './Analysis.css';
import { Chart, defaults } from 'chart.js/auto';
import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import toast from "react-hot-toast";
import axios from 'axios';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export function Analysis() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("vendorToken");
                const res = await axios.get("http://localhost:8000/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (res.status === 200) {
                    setProducts(res.data);
                    toast.success("Products loaded and Analyzed");
                } else {
                    toast.error("Failed to Analyze");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Server Issue");
            }
        };

        fetchProducts();
    }, []);

    const totalRevenue = products.reduce((acc, p) =>
        acc + (Number(p.sellingPrice) * Number(p.quantity)), 0
    );

    const sellingPrice = products.reduce((acc, p) =>
        acc + Number(p.sellingPrice), 0
    );

    const costPrice = products.reduce((acc, p) =>
        acc + Number(p.costPrice), 0
    );

    return (
        <>
            <div className='chart-container'>

                <div className='chart-card'>
                    <Bar
                        data={{
                            labels: ["5/12", "6/12", "7/12"],
                            datasets: [
                                { label: "Revenue", data: [232, 456, totalRevenue] }
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Revenue Generated",
                                }
                            }
                        }}
                    />
                </div>

                <div className='chart-card'>
                    <Line
                        data={{
                            labels: ['A', 'B', 'C', 'D', 'E'],
                            datasets: [
                                {
                                    label: "Selling Price",
                                    data: [256, 555, sellingPrice],
                                    borderWidth: 3,
                                    borderColor: "blue",
                                    backgroundColor: "rgba(31, 119, 180, 0.3)"
                                },
                                {
                                    label: "Cost Price",
                                    data: [156, 664, costPrice],
                                    borderColor: "orange",
                                    backgroundColor: "rgba(255, 127, 14, 0.3)"
                                }
                            ],
                        }}
                        options={{
                            plugins: { title: { display: true, text: "Savings" } },
                            elements: { line: { tension: 0.5 } }
                        }}
                    />
                </div>

            </div>
        </>
    );
}
