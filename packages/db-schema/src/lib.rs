use sqlx::types::chrono;

#[derive(sqlx::Type)]
#[sqlx(rename_all = "snake_case")]
pub enum VendorKey {
    GSuite,
}

#[derive(sqlx::FromRow)]
pub struct Vendor {
    pub id: String,
    pub key: VendorKey,
    pub name: String,
}

#[derive(sqlx::FromRow)]
pub struct Organization {
    pub id: String,
    pub name: String,
}

#[derive(sqlx::Type)]
#[sqlx(rename_all = "snake_case")]
pub enum VendorSubscriptionStatus {
    Active,
    Inactive,
}

#[derive(sqlx::FromRow)]
pub struct VendorSubscription {
    pub id: String,
    pub vendor_id: String,
    pub organization_id: String,
    pub status: VendorSubscriptionStatus,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

#[derive(sqlx::FromRow)]
pub struct VendorUser {
    pub user_id: String,
    pub organization_id: String,
    pub email: String,
    pub name: String,
    pub vendor_subscription_id: String,
}

#[derive(sqlx::FromRow)]
pub struct VendorActivity {
    pub id: String,
    pub vendor_user_id: String,
    pub vendor_subscription_id: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(sqlx::FromRow)]
pub struct VendorContract {
    pub id: String,
    pub vendor_subscription_id: String,
    pub seats_purchased: i32,
    pub annual_cost: f64,
    pub renewal_date: chrono::DateTime<chrono::Utc>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}
