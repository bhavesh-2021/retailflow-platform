CREATE DATABASE retailflow_users;
CREATE DATABASE retailflow_inventory;
CREATE DATABASE retailflow_billing;
CREATE DATABASE retailflow_notification;

\connect retailflow_users
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\connect retailflow_inventory
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\connect retailflow_billing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\connect retailflow_notification
CREATE EXTENSION IF NOT EXISTS "pgcrypto";