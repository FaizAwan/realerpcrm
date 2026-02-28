export interface Warehouse {
    id: string;
    name: string;
    location: string;
}

export interface Supplier {
    id: string;
    name: string;
    contactEmail: string;
    leadTimeDays: number;
}

export interface Product {
    sku: string;
    name: string;
    category: string;
    uom: string;
    price: number;
    globalStock: number;
}

export interface WarehouseStock {
    warehouseId: string;
    sku: string;
    quantity: number;
    reorderPoint: number;
}

export interface PurchaseOrder {
    id: string;
    supplierId: string;
    warehouseId: string;
    status: "Draft" | "Sent" | "Partially Received" | "Received";
    orderDate: string;
    expectedDate: string;
}

export interface PurchaseOrderItem {
    poId: string;
    sku: string;
    quantityOrdered: number;
    quantityReceived: number;
}

export interface StockTransfer {
    id: string;
    sourceWarehouseId: string;
    destinationWarehouseId: string;
    status: "Draft" | "In Transit" | "Completed" | "Cancelled";
    requestedDate: string;
    shippedDate?: string;
    receivedDate?: string;
}

export interface StockTransferItem {
    transferId: string;
    sku: string;
    quantity: number;
}

export interface InventoryTransaction {
    id: string;
    warehouseId: string;
    sku: string;
    type: "Inbound: PO" | "Inbound: Transfer" | "Inbound: Return" |
    "Outbound: Sales Order" | "Outbound: Transfer" |
    "Adjustment: Loss" | "Adjustment: Damage" | "Initial Count";
    quantityChange: number; // positive or negative
    referenceId: string; // PO ID, Transfer ID, or SO ID
    transactionDate: string;
}
