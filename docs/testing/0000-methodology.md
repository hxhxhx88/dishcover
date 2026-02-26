# Methodology

Each test case involves the following steps:

- Reset the application state to a specific value
- Execute actions
- Verify the behavior matches expectations

The application state consists of two parts:

- **Server state**: the database values
- **Client state**: the persisted state of the client app

Resetting the application state requires resetting both components.
