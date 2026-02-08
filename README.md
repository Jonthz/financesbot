# Dashboard Financiero - Bot de WhatsApp

Dashboard web optimizado para móviles que muestra información financiera personal a través de un bot de WhatsApp usando Jelou.

## Características

- **Gauge Chart**: Muestra el dinero disponible para gastar
- **Gráfico de Barras**: Compara gastos planeados vs reales por categoría
- **Gráfico de Dona**: Distribución porcentual de gastos

## Stack Tecnológico

- HTML5
- CSS3 (Mobile-first design)
- JavaScript (Vanilla)
- Chart.js v4.4.1
- Vercel (Deployment)

## Estructura del Proyecto

```
FinancesBot/
├── index.html       # Estructura principal del dashboard
├── styles.css       # Estilos optimizados para móvil
├── app.js          # Lógica y configuración de gráficos
├── vercel.json     # Configuración de despliegue
├── package.json    # Metadata del proyecto
└── README.md       # Este archivo
```

## Instalación y Desarrollo Local

1. Clona el repositorio
2. Abre `index.html` directamente en tu navegador, o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx serve)
npx serve .
```

3. Abre http://localhost:8000 en tu navegador

## Despliegue en Vercel

### Opción 1: CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Opción 2: GitHub Integration

1. Sube el código a GitHub
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Vercel desplegará automáticamente

### Opción 3: Arrastrar y Soltar

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra la carpeta del proyecto
3. Listo

## Integración con Jelou

Para usar este dashboard en tu bot de WhatsApp con Jelou:

1. Despliega en Vercel y obtén la URL (ej: `https://tu-proyecto.vercel.app`)
2. En tu flujo de Jelou, configura un nodo con el tool "eCommerce - Product WebView"
3. Ajusta el `viewType` o usa la URL de tu dashboard

### Pasar Datos del Bot al WebView

En tu código de Jelou, puedes pasar datos al webview:

```javascript
// En el nodo de código de Jelou
$memory.setJson("dashboardData", {
    leftToSpend: 174.36,
    totalBudget: 1000,
    plannedVsActual: { /* ... */ },
    expensesBreakdown: { /* ... */ }
}, 3600);
```

Luego, en el webview, puedes leer estos datos y actualizar el dashboard usando la función `updateDashboardData()`.

## Personalización

### Cambiar Colores

Edita las variables CSS en [styles.css](styles.css:11-21):

```css
:root {
    --primary-color: #4F46E5;
    --secondary-color: #10B981;
    /* ... */
}
```

### Cambiar Datos

Edita el objeto `financialData` en [app.js](app.js:4-18):

```javascript
const financialData = {
    leftToSpend: 174.36,
    // ...
};
```

### Conectar a una API

Reemplaza los datos mock en [app.js](app.js:4) con llamadas a tu API:

```javascript
async function fetchFinancialData() {
    const response = await fetch('https://tu-api.com/financial-data');
    const data = await response.json();
    updateDashboardData(data);
}
```

## Modo Oscuro

El dashboard incluye soporte automático para modo oscuro basado en las preferencias del sistema.

## Optimización para WhatsApp

- Vista móvil optimizada (max-width: 480px)
- Sin scroll horizontal
- Carga rápida (librería CDN de Chart.js)
- Touch-friendly
- Colores contrastantes para legibilidad

## Licencia

MIT
