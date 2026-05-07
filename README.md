# Frontend Price Comparison

Aplicacion Angular que consume la API del backend `backend-price-comparison`.

## Tech Stack

- **Angular** 21 (standalone components)
- **Signals** + RxJS
- **TypeScript** strict mode

## Servicios implementados

| Servicio | Endpoints |
|----------|-----------|
| `HealthService` | `GET /api/v1/health` |
| `StateService` | `GET /api/v1/states` |
| `TypeUserService` | `GET /api/v1/type-users` |
| `CategoryProductService` | CRUD `/api/v1/category-products` |
| `CategoryStoreService` | CRUD `/api/v1/category-stores` |
| `StoreService` | CRUD `/api/v1/stores` (paginado) |
| `ProductService` | CRUD `/api/v1/products` + filtro por tienda |
| `UserService` | CRUD `/api/v1/users` |
| `SaleService` | CRUD `/api/v1/sales` (paginado, con productos) |
| `ClientService` | Natural + Legal CRUD + búsqueda por documento |
| `DocumentTypeService` | `GET /api/v1/client/document-type` |

## Configuracion

Editar `src/environments/environment.ts` para cambiar la URL de la API y el token:

```typescript
apiUrl: 'http://localhost:8080/api/v1',
authToken: 'test',
```

## Desarrollo

```bash
npm install
npm start        # http://localhost:4200
```

## Build

```bash
npm run build    # output en dist/
```
