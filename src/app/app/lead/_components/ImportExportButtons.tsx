"use client";

import { Download, Upload } from "lucide-react";
import * as xlsx from "xlsx";
import { Lead } from "../types";

interface ImportExportButtonsProps {
    leads: Lead[];
    onImport: (importedLeads: Omit<Lead, "id" | "createdAt">[]) => void;
}

export function ImportExportButtons({ leads, onImport }: ImportExportButtonsProps) {
    const handleExport = () => {
        // 1. Convert leads array to worksheet
        const worksheet = xlsx.utils.json_to_sheet(leads.map(lead => ({
            Name: lead.name,
            Phone: lead.phone,
            Email: lead.email,
            Source: lead.source,
            Status: lead.status,
            "Created At": lead.createdAt
        })));

        // 2. Create workbook and add the worksheet
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Leads");

        // 3. Write to file
        xlsx.writeFile(workbook, "Leads_Export.xlsx");
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result;
            const workbook = xlsx.read(data, { type: "binary" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = xlsx.utils.sheet_to_json<any>(worksheet);

            // Map imported json to expected schema
            const mappedLeads = json.map((row) => ({
                name: row.Name || row.name || "Unknown",
                phone: row.Phone || row.phone || "",
                email: row.Email || row.email || "",
                source: row.Source || row.source || "Digital Marketing",
                status: row.Status || row.status || "New lead",
            }));

            onImport(mappedLeads);
        };
        reader.readAsBinaryString(file);
        e.target.value = ""; // Reset input
    };

    return (
        <div className="flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                <Upload className="w-4 h-4" />
                Import Excel
                <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    className="hidden"
                    onChange={handleImport}
                />
            </label>
            <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
                <Download className="w-4 h-4" />
                Export Excel
            </button>
        </div>
    );
}
