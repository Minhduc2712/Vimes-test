CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY, 
    warehouse_code VARCHAR(50) UNIQUE, 
    warehouse_name VARCHAR(255) NOT NULL,
    warehouse_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE medical_supplies (
    id SERIAL PRIMARY KEY, 
    item_code VARCHAR(50) UNIQUE, 
    item_name VARCHAR(255), 
    unit VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE supply_receipts (
    id SERIAL PRIMARY KEY,
    receipt_code VARCHAR(50) UNIQUE NOT NULL,
    organization_name VARCHAR(255),
    department_name VARCHAR(255),
    entry_date DATE NOT NULL,
    receipt_number VARCHAR(50) UNIQUE NOT NULL, 
    debit_account VARCHAR(50),         
    credit_account VARCHAR(50),   
    deliverer_name VARCHAR(255),  
    source_doc_type VARCHAR(100),      
    source_doc_no VARCHAR(100),        
    source_doc_date DATE,              
    source_doc_issuer VARCHAR(255),
    warehouse_id INT REFERENCES warehouses(id), 
    total_amount DECIMAL(15, 2) DEFAULT 0,
    attached_doc_note TEXT,
    creator_name VARCHAR(255),
    storekeeper_name VARCHAR(255),
    chief_accountant_name VARCHAR(255), 
    signed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE supply_receipts_details (
    id SERIAL PRIMARY KEY,
    receipt_id INT REFERENCES supply_receipts(id),
    item_id INT REFERENCES medical_supplies(id),
    doc_quantity DECIMAL(10, 2), 
    actual_quantity DECIMAL(10, 2), 
    unit_price DECIMAL(15, 2),
    total_price DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_supply_details_receipt_id ON supply_receipts_details(receipt_id);