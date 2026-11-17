
## API endpoints

Base URL: `http://localhost:5000/api/products`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/products` | Create a product; send all seven fields above. Returns 201. |
| GET | `/api/products` | List all products. Returns 200. |
| GET | `/api/products/:id` | Get a product by its 24-character MongoDB ObjectId. |
| PATCH | `/api/products/:id` | Partially update; send one or more product fields. |
| PUT | `/api/products/:id` | Replace a product; send all seven fields above. |
| DELETE | `/api/products/:id` | Delete a product by ID. |

For PATCH, for example:

```json
{
  "price": 19.99,
  "stock": 42
}
```
