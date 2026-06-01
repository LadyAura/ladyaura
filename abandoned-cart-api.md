# API privada para carritos abandonados

La web ya envia eventos si existe `window.LADY_AURA_CART_API_URL` o si se guarda `LADY_AURA_CART_API_URL` en `localStorage`.

Configura la URL en `private-cart-config.js`:

```js
window.LADY_AURA_CART_API_URL = 'https://tu-dominio.com/api/abandoned-carts';
window.LADY_AURA_CART_ADMIN_API_URL = 'https://tu-dominio.com/api/abandoned-carts';
```

## Evento desde la tienda

`POST /api/abandoned-carts`

```json
{
  "session_id": "la-uuid",
  "status": "cart",
  "estado": "cart",
  "coupon": "LADYAURA5",
  "customer": {
    "nombre": "Nombre",
    "apellidos": "Apellidos",
    "email": "email@dominio.com"
  },
  "total": 84,
  "updated_at": "2026-05-29T12:00:00.000Z",
  "items": [
    {
      "nombre": "Producto",
      "tamano": "60x90",
      "precio": 84,
      "cupon": "LADYAURA5",
      "fecha_hora": "2026-05-29T12:00:00.000Z"
    }
  ]
}
```

Estados usados: `cart`, `checkout_started`, `paid`, `abandoned`.

Cuando el proveedor de pago confirme el cobro, llama al endpoint con `status: "paid"` desde el servidor. Si vuelves a la tienda con una URL tipo `carrito.html?payment_status=paid&order_id=LA-123`, la web tambien enviara el evento `paid`.

## Panel privado

`admin-carritos.html` consulta la API con:

`Authorization: Bearer TU_CLAVE_PRIVADA`

Respuesta esperada:

```json
{
  "carts": [
    {
      "session_id": "la-uuid",
      "updated_at": "2026-05-29T12:00:00.000Z",
      "status": "abandoned",
      "customer": { "nombre_completo": "Nombre Apellidos", "email": "email@dominio.com" },
      "total": 84,
      "items": [{ "nombre": "Producto", "tamano": "60x90", "precio": 84 }]
    }
  ]
}
```

## Regla de abandono

En el servidor, una tarea programada debe ejecutar esta regla:

```sql
UPDATE carts
SET status = 'abandoned'
WHERE status IN ('cart', 'checkout_started')
  AND updated_at < NOW() - INTERVAL '2 hours';
```

La web tambien hace un aviso de abandono si sigue abierta mas de 2 horas, pero la regla fiable tiene que vivir en el servidor.
