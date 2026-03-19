markdown
# 🏥 Sistema de Historias Clínicas Digitales con Firma Digital

<div align="center">

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![API REST](https://img.shields.io/badge/API-REST-000000?style=for-the-badge)

**Aplicación web desarrollada con Angular para la gestión de historias clínicas digitales**

Huancayo - Perú | 2026

</div>

---

## 📌 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Problema Identificado](#-problema-identificado)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Características Principales](#-características-principales)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Scripts Disponibles](#-scripts-disponibles)
- [Seguridad](#-seguridad)
- [Beneficios](#-beneficios)
- [Pruebas Realizadas](#-pruebas-realizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Recursos Adicionales](#-recursos-adicionales)
- [Autor](#-autor)

---

## 📋 Descripción del Proyecto

Aplicación web desarrollada para el **Hospital El Carmen** que permite gestionar historias clínicas digitales de manera segura, incorporando firma digital para garantizar la autenticidad, integridad y validez de los documentos médicos.

### El sistema permite:

- ✅ Registro de pacientes
- ✅ Gestión de historias clínicas
- ✅ Firma digital de documentos
- ✅ Validación de autenticidad
- ✅ Acceso seguro para personal médico

---

## ⚠️ Problema Identificado

En muchos centros de salud se presentan las siguientes problemáticas:

| Problema | Consecuencia |
|----------|--------------|
| 📄 Uso de historias clínicas en papel | Difícil acceso y almacenamiento |
| 🔍 Riesgo de pérdida o alteración | Información no confiable |
| ⏱️ Procesos manuales lentos | Baja eficiencia operativa |
| 🔒 Falta de seguridad | Documentos vulnerables |

**Solución:** Sistema digital que mejora la eficiencia y seguridad mediante tecnologías web y firma digital.

---

## 🏗 Arquitectura del Sistema

El sistema sigue una arquitectura **cliente-servidor**:
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Frontend │────▶│ API REST │────▶│ Base de │
│ Angular │◀────│ Backend │◀────│ Datos │
└─────────────┘ └─────────────┘ └─────────────┘

text

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| **Angular** | Framework frontend |
| **TypeScript** | Lenguaje de programación |
| **HTML5 / CSS3** | Maquetación y estilos |
| **API REST** | Comunicación con backend |
| **Firma Digital** | Autenticación de documentos |
| **Seguridad** | Protección de datos clínicos |

---

## ✨ Características Principales

- 📝 **Registro de pacientes** - Gestión completa de datos personales
- 📋 **Historias clínicas** - Creación y edición de documentos médicos
- ✍️ **Firma digital** - Autenticación de documentos
- 🔍 **Validación** - Verificación de integridad de documentos
- 👥 **Control de acceso** - Roles y permisos de usuario

---

## 🔧 Instalación

### Requisitos Previos

- Node.js
- npm
- Angular CLI

### Pasos de Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/AxelAndr123456789/HospitalCarmen.git

# 2. Entrar al directorio
cd HospitalCarmen

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
ng serve
💻 Uso
Una vez instalado, abre tu navegador y accede a:

text
http://localhost:4200/
Flujo básico de uso:
Iniciar sesión como personal médico

Registrar nuevo paciente

Crear historia clínica

Aplicar firma digital

Validar documento

📜 Scripts Disponibles
Comando	Descripción
ng serve	Inicia servidor de desarrollo
ng build	Compila el proyecto para producción
ng test	Ejecuta pruebas unitarias
ng generate component <nombre>	Genera un nuevo componente
ng build --configuration production	Build de producción
🔐 Seguridad
El sistema implementa múltiples capas de seguridad:

🔏 Firma digital - Autenticidad de documentos

👤 Control de acceso - Usuarios autenticados

🔒 Protección de datos - Información clínica segura

✅ Validación - Integridad de documentos

📈 Beneficios
text
┌─────────────────────────────────────┐
│                                     │
│   📉 Papel        →    💻 Digital  │
│   ⚠️ Inseguro      →    🔒 Seguro   │
│   🐢 Lento         →    ⚡ Rápido    │
│   📦 Desorganizado →    📊 Organizado│
│                                     │
└─────────────────────────────────────┘
Reducción del uso de papel - 100% digital

Mayor seguridad - Información protegida

Acceso rápido - Consultas inmediatas

Eficiencia hospitalaria - Procesos optimizados

🧪 Pruebas Realizadas
Módulo	Estado
Registro de pacientes	✅ Funcional
Creación de historia clínica	✅ Funcional
Firma digital aplicada	✅ Funcional
Validación de documentos	✅ Funcional
Acceso seguro	✅ Funcional
📂 Estructura del Proyecto
text
src/
│
├── app/
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Páginas/Vistas principales
│   ├── services/           # Servicios para API y lógica
│   ├── models/             # Interfaces y modelos de datos
│   ├── guards/             # Protección de rutas
│   ├── interceptors/       # Interceptores HTTP
│   └── app.module.ts       # Módulo principal
│
├── assets/                  # Recursos estáticos
├── environments/            # Configuración por entorno
└── styles.css               # Estilos globales
📚 Recursos Adicionales
Documentación oficial de Angular

Guía de firma digital

API REST

👤 Autor
<div align="center">
UNIVERSIDAD CONTINENTAL

Integrante:
Lopez Rodriguez Axel

Huancayo, Perú - 2026

🔗 Repositorio:
https://github.com/AxelAndr123456789/HospitalCarmen

⭐️ Si te fue útil este proyecto, ¡no olvides darle una estrella! ⭐️

</div> ```
