-- Add up migration script here
ALTER TABLE Vendor
ADD COLUMN VendorKey ENUM('g_suite') NOT NULL;
