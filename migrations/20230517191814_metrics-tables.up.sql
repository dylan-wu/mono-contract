START TRANSACTION;

-- A vendor is a SaaS provider
CREATE TABLE Vendor
(
  id CHAR(26) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- An organization one of our customers who may utilize multiple Vendor(s)
CREATE TABLE Organization
(
  id CHAR(26) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- An active vendor subscription for an organization
CREATE TABLE VendorSubscription
(
  id CHAR(26) PRIMARY KEY NOT NULL,
  vendor_id CHAR(26) NOT NULL,
  organization_id CHAR(26) NOT NULL,
  status ENUM("inactive", "active") NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  -- FOREIGN KEY (vendor_id) REFERENCES Vendor(id),
  -- FOREIGN KEY (organization_id) REFERENCES Organization(id)
);

-- A user of a certain vendor subscription
CREATE TABLE VendorUser
(
  user_id CHAR(26) PRIMARY KEY NOT NULL,
  organization_id CHAR(26) NOT NULL,
  email VARCHAR(320) NOT NULL,
  name VARCHAR(255) NOT NULL,
  vendor_subscription_id CHAR(26) NOT NULL
  -- FOREIGN KEY (vendor_subscription_id) REFERENCES VendorSubscription(id)
);

-- A users activity with a certain vendor product
CREATE TABLE VendorActivity
(
  id CHAR(26) PRIMARY KEY NOT NULL,
  vendor_user_id CHAR(26) NOT NULL,
  vendor_subscription_id CHAR(26) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  -- FOREIGN KEY (vendor_user_id) REFERENCES VendorUser(id),
  -- FOREIGN KEY (vendor_subscription_id) REFERENCES VendorSubscription(id)
);

CREATE TABLE VendorContract
(
  id CHAR(26) PRIMARY KEY NOT NULL,
  vendor_subscription_id CHAR(26) NOT NULL,
  seats_purchased INT NOT NULL,
  annual_cost DECIMAL(10,2) NOT NULL,
  renewal_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  -- FOREIGN KEY (vendor_subscription_id) REFERENCES VendorSubscription(id)
);

COMMIT;
