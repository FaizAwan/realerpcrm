"use client";

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "./societyMap.json"; // We will create this mock JSON next

// Load the mapping module safely
if (typeof Highcharts === "object") {
    const HC_map = require("highcharts/modules/map");
    if (typeof HC_map === "function") {
        HC_map(Highcharts);
    } else if (HC_map && typeof HC_map.default === "function") {
        HC_map.default(Highcharts);
    }
}

export default function SocietyMap() {
    const [options, setOptions] = useState<Highcharts.Options | null>(null);

    useEffect(() => {
        // Prepare the series data with mock statuses (booked, vacant, etc.)
        const data = mapData.features.map((feature: any) => ({
            id: feature.id,
            value: Math.floor(Math.random() * 100), // Mock data value
            status: ["booked", "vacant", "reserved"][Math.floor(Math.random() * 3)],
        }));

        const getStatusColor = (status: string) => {
            switch (status) {
                case "booked": return "#007b5e"; // Primary green
                case "vacant": return "#e2e8f0"; // Slate 200
                case "reserved": return "#f59e0b"; // Amber 500
                default: return "#f1f5f9";
            }
        };

        const chartOptions: Highcharts.Options = {
            chart: {
                map: mapData as any,
                backgroundColor: "transparent",
                spacingBottom: 20,
                spacingTop: 20,
                spacingLeft: 20,
                spacingRight: 20,
                height: 600,
            },
            title: {
                text: "",
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: "bottom",
                },
            },
            colorAxis: {
                visible: false, // We use specific status colors instead
            },
            tooltip: {
                headerFormat: "",
                useHTML: true,
                pointFormatter: function () {
                    const statusText = (this as any).status || "Unknown";

                    return `
                        <div style="padding: 10px; min-width: 200px;">
                            <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #1e293b;">Plot ${(this as any).id}</h3>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <span style="font-size: 12px; color: #64748b; text-transform: uppercase;">Status</span>
                                <span style="font-size: 14px; font-weight: bold; color: ${getStatusColor(statusText)}">
                                    ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}
                                </span>
                            </div>
                        </div>
                    `;
                },
            },
            series: [
                {
                    type: "map",
                    data: data,
                    joinBy: ["id", "id"],
                    keys: ["id", "value", "status"],
                    borderColor: "#ffffff",
                    borderWidth: 1.5,
                    states: {
                        hover: {
                            color: "#0f172a", // Darker on hover
                            borderColor: "#ffffff",
                            brightness: -0.1
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{point.id}",
                        style: {
                            fontSize: "8px",
                            fontWeight: "bold",
                            color: "#1e293b",
                            textOutline: "2px #ffffff"
                        },
                    },
                    point: {
                        events: {
                            click: function () {
                                console.log("Clicked plot", (this as any).id);
                                // Here we can show a detailed sidebar or modal
                            }
                        }
                    },
                } as any,
            ],
            plotOptions: {
                map: {
                    color: "#e2e8f0", // Default color
                    events: {
                        rendered: function () {
                            // Apply dynamic colors based on status after drawing
                            (this as any).points.forEach((p: any) => {
                                if (p.status) {
                                    p.update({ color: getStatusColor(p.status) }, false);
                                }
                            });
                            (this as any).chart.redraw();
                        }
                    } as any
                } as any
            },
            credits: {
                enabled: false
            }
        };

        setOptions(chartOptions);
    }, []);

    if (!options) return <div className="h-[600px] w-full flex items-center justify-center bg-slate-50 text-slate-500 font-semibold animate-pulse rounded-2xl border-4 border-white shadow-sm">Loading map...</div>;

    return (
        <div className="w-full relative bg-[#f8f9fa] rounded-2xl overflow-hidden border-8 border-white shadow-md">
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={"mapChart"}
                options={options}
            />
            {/* Legend Overlay */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur shadow-lg px-6 py-4 rounded-2xl border-2 border-primary/10 flex flex-col gap-3 z-10 pointer-events-none">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 mb-1 block">Legend</span>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-[#007b5e] shadow-inner border border-black/10"></div>
                    <span className="text-xs font-bold text-slate-600">Booked</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-[#f59e0b] shadow-inner border border-black/10"></div>
                    <span className="text-xs font-bold text-slate-600">Reserved</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-[#e2e8f0] shadow-inner border border-black/10"></div>
                    <span className="text-xs font-bold text-slate-600">Vacant</span>
                </div>
            </div>
        </div>
    );
}
