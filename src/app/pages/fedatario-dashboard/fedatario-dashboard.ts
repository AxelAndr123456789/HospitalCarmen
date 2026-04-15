import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-fedatario-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fedatario-dashboard.html',
  styleUrl: './fedatario-dashboard.css',
})
export class FedatarioDashboard implements OnInit {
  currentUser: User | null = null;
  activeView: string = 'overview';

  // Configuración de Idioma
  showLanguageDropdown = false;
  currentLang: 'es' | 'en' = 'es';
  languages: { code: 'es' | 'en'; name: string }[] = [
    { code: 'es', name: 'Español (España)' },
    { code: 'en', name: 'English (US)' },
  ];

  // Configuración de Tema
  isDarkMode = false;

  // Diccionario de traducciones simple
  translations: any = {
    es: {
      profileTitle: 'Perfil del Usuario',
      saveBtn: 'Guardar cambios',
      fullName: 'NOMBRE COMPLETO',
      specialty: 'ESPECIALIDAD',
      regNumber: 'NÚMERO DE COLEGIATURA',
      role: 'ROL',
      sysPrefs: 'Preferencias del Sistema',
      interfaceLang: 'IDIOMA DE LA INTERFAZ',
      viewMode: 'MODO DE VISUALIZACIÓN',
      lightMode: 'Claro',
      darkMode: 'Oscuro',
      deleteAcc: 'Eliminar cuenta',
      deleteWarn: 'Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.',
    },
    en: {
      profileTitle: 'User Profile',
      saveBtn: 'Save changes',
      fullName: 'FULL NAME',
      specialty: 'SPECIALTY',
      regNumber: 'REGISTRATION NUMBER',
      role: 'ROLE',
      sysPrefs: 'System Preferences',
      interfaceLang: 'INTERFACE LANGUAGE',
      viewMode: 'VIEW MODE',
      lightMode: 'Light',
      darkMode: 'Dark',
      deleteAcc: 'Delete account',
      deleteWarn: 'Once you delete your account, there is no going back. Please be sure.',
    },
  };

  // Datos del perfil del usuario
  userProfile = {
    nombre: 'Fedatario Institucional',
    especialidad: 'Área Legal / Notarial',
    colegiatura: 'FED-123456',
    rol: 'Fedatario',
  };

  // Stats (originales)
  pendientes: number = 8;
  firmados: number = 245;

  documents = [
    { id: 'DOC-2024-F01', paciente: 'Juan Pérez', doctor: 'Dr. Mendoza', fecha: '2024-03-25', tipo: 'Historia Clínica', status: 'pending' },
    { id: 'DOC-2024-F02', paciente: 'María García', doctor: 'Dra. Silva', fecha: '2024-03-25', tipo: 'Receta Médica', status: 'pending' },
    { id: 'DOC-2024-F03', paciente: 'Carlos Ruiz', doctor: 'Dr. Torres', fecha: '2024-03-24', tipo: 'Informe Quirúrgico', status: 'pending' }
  ];

  // ── INICIO VIEW – datos del diseño ──────────────────────────────────

  // Stat cards inicio
  porFirmar: number = 12;
  firmadosHoy: number = 45;
  tiempoPromedio: string = '4.2';

  // Pendientes de alta prioridad
  pendientesAlta = [
    { expediente: 'EXP-9920-X', paciente: 'Carlos Alberto Benites', recibido: 'Hace 15 min' },
    { expediente: 'EXP-9854-A', paciente: 'Maria Elena Rojas',      recibido: 'Hace 32 min' }
  ];

  // Historial reciente de firmas
  historialFirmas = [
    { certificado: '#CRT-2023-8841', paciente: 'Alejandra Méndez', dni: 'DNI: 45893503', initials: 'AM', avatarClass: 'avatarCyan',   tipo: 'Historial Clínico', fecha: '12 Oct 2023', hora: '06:45 AM' },
    { certificado: '#CRT-2023-8839', paciente: 'Roberto Pinedo',   dni: 'DNI: 66748094', initials: 'RP', avatarClass: 'avatarIndigo', tipo: 'Historial Clínico', fecha: '12 Oct 2023', hora: '06:45 AM' },
    { certificado: '#CRT-2023-8835', paciente: 'Lucía Vargas',     dni: 'DNI: 38561775', initials: 'LV', avatarClass: 'avatarPurple', tipo: 'Historial Clínico', fecha: '12 Oct 2023', hora: '06:45 AM' },
    { certificado: '#CRT-2023-8830', paciente: 'Julian Salazar',   dni: 'DNI: 41302005', initials: 'JS', avatarClass: 'avatarOrange', tipo: 'Historial Clínico', fecha: '12 Oct 2023', hora: '06:45 AM' }
  ];

  // Paginación historial
  historialPage = 1;
  historialPerPage = 4;
  historialTotal = 128;

  get historialPages(): number { return Math.ceil(this.historialTotal / this.historialPerPage); }
  get historialPagesArray(): number[] { return Array.from({ length: Math.min(this.historialPages, 5) }, (_, i) => i + 1); }
  get paginatedHistorial() {
    const s = (this.historialPage - 1) * this.historialPerPage;
    return this.historialFirmas.slice(s, s + this.historialPerPage);
  }
  changeHistorialPage(p: number) { if (p >= 1 && p <= this.historialPages) this.historialPage = p; }

  // ── PENDIENTES VIEW – datos del diseño ─────────────────────────────
  
  docStats = {
    total: 124,
    altaPrioridad: 18,
    vencenHoy: 5,
    completadosHoy: 42
  };

  documentosList = [
    { exp: 'EXP-2023-8812', doc: 'DOC-5510-A', fecha: '24 Oct, 2023 09:15', prioridad: 'URGENTE', emisor: 'Juan Morales', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
    { exp: 'EXP-2023-8824', doc: 'DOC-5521-B', fecha: '24 Oct, 2023 11:30', prioridad: 'URGENTE', emisor: 'Elena Vega', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
    { exp: 'EXP-2023-8839', doc: 'DOC-5534-C', fecha: '23 Oct, 2023 16:45', prioridad: 'URGENTE', emisor: 'Ana Ríos', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop' },
    { exp: 'EXP-2023-8841', doc: 'DOC-5542-D', fecha: '23 Oct, 2023 17:20', prioridad: 'URGENTE', emisor: 'Ricardo Torres', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' }
  ];

  docPage = 1;
  docTotalPages = 13;

  // ── RECIBIDOS VIEW – datos del diseño ─────────────────────────────
  
  receivedDocsStats = {
    total: 85,
    nuevos: 12,
    porProcesar: 45,
    completadosHoy: 28
  };

  receivedDocsList = [
    { exp: 'EXP-2023-9102', doc: 'DOC-6610-R', fecha: '14 Abr, 2024 08:30', prioridad: 'URGENTE', emisor: 'Ana Belén', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { exp: 'EXP-2023-9125', doc: 'DOC-6621-S', fecha: '14 Abr, 2024 09:45', prioridad: 'MEDIA',   emisor: 'Carlos Ruiz', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { exp: 'EXP-2023-9139', doc: 'DOC-6634-T', fecha: '13 Abr, 2024 15:20', prioridad: 'BAJA',    emisor: 'Lucía Torres', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
    { exp: 'EXP-2023-9141', doc: 'DOC-6642-U', fecha: '13 Abr, 2024 16:55', prioridad: 'URGENTE', emisor: 'Marcos Peña', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' }
  ];

  receivedPage = 1;
  receivedTotalPages = 9;

  // ── FIRMADOS VIEW – datos del diseño ────────────────────────────────
  
  signedDocs = [
    { exp: 'EXP-2023-9021', doc: 'Historial Clínico', paciente: 'Carlos Mendoza Ruiz', initials: '', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', fecha: '12 Oct 2023, 09:45', estado: 'FIRMADO' },
    { exp: 'EXP-2023-8842', doc: 'Historial Clínico', paciente: 'Elena Vásquez Paz',  initials: '', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', fecha: '11 Oct 2023, 14:20', estado: 'PENDIENTE' },
    { exp: 'EXP-2023-8711', doc: 'Historial Clínico', paciente: 'Ricardo Torres Gutiérrez',   initials: '', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', fecha: '11 Oct 2023, 11:05', estado: 'FIRMADO' },
    { exp: 'EXP-2023-8650', doc: 'Historial Clínico', paciente: 'Mariana Alva Rojas',     initials: 'MA', avatar: '', fecha: '10 Oct 2023, 17:30', estado: 'OBSERVADO' }
  ];

  signedTotal = 124; // Mostrando 1-4 de 124
  signedTotalFirmados = '1,284';
  
  // ── EXPEDIENTES VIEW – datos del diseño ────────────────────────────
  
  expedientesStats = {
    nuevos: 24,
    pendientesFirma: 58,
    efectividad: '98.4%'
  };

  expedientesListDiseno = [
    { nro: 'EXP-2024-0482', paciente: 'Alejandro Mendoza', id: '402-2345678-1', initials: 'AM', color: 'avatarPurple', fecha: '12 Oct 2024', archivos: 12, estado: 'ABIERTO' },
    { nro: 'EXP-2024-0479', paciente: 'Elena Rodriguez',  id: '001-9876543-2', initials: 'ER', color: 'avatarBlue',   fecha: '10 Oct 2024', archivos: 8,  estado: 'EN PROCESO' },
    { nro: 'EXP-2024-0475', paciente: 'Julian Martinez',  id: '054-1122334-9', initials: 'JM', color: 'avatarRed',    fecha: '08 Oct 2024', archivos: 24, estado: 'CERRADO' }
  ];

  expTotalCount = 142;

  // ── REPORTE VIEW – datos del diseño ────────────────────────────────
  reporteStats = [
    { label: 'DOCUMENTOS FIRMADOS', value: '1,284', trend: '+12.5% ↗', trendUp: true, icon: 'file-text', color: 'purple' },
    { label: 'TIEMPO PROMEDIO FIRMA', value: '18 min', trend: '-4 min ↘', trendUp: false, icon: 'clock', color: 'cyan' },
    { label: 'PENDIENTES URGENTES', value: '14', badge: 'Crítico', icon: 'alert-triangle', color: 'red' },
    { label: 'INTEGRIDAD DE VALIDACIÓN', value: '99.9%', badge: 'Óptimo', icon: 'shield-check', color: 'green' }
  ];

  actividadReportes = [
    { id: 1, fecha: 'Hoy, 13:30', tipo: 'Reporte de Consentimientos Quirúrgicos', subtipo: 'EXPORTACIÓN PROGRAMADA', responsable: 'María Alcaraz', rInitial: 'MA', rColor: 'avatarPurple', estado: 'COMPLETADO', eClass: 'e-completado' },
    { id: 2, fecha: 'Ayer, 19:15', tipo: 'Firma Masiva de Altas Voluntarias', subtipo: 'EVENTO DEL SISTEMA', responsable: 'Ricardo Silva', rInitial: 'RS', rColor: 'avatarCyan', estado: 'EXITOSO', eClass: 'e-exitoso' },
    { id: 3, fecha: '23 Oct, 10:20', tipo: 'Resumen de Traslados Inter-hospitalarios', subtipo: 'REPORTE MENSUAL', responsable: 'Jorge Luna', rInitial: 'JL', rColor: 'avatarOrange', estado: 'EN PROCESO', eClass: 'e-proceso' },
    { id: 4, fecha: '22 Oct, 23:55', tipo: 'Auditoria de Certificados de Defunción', subtipo: 'REVISIÓN DE CUMPLIMIENTO', responsable: 'María Alcaraz', rInitial: 'MA', rColor: 'avatarPurple', estado: 'FINALIZADO', eClass: 'e-finalizado' }
  ];

  // ────────────────────────────────────────────────────────────────────

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user || user.role !== 'fedatario') {
        // Redirigir al login si no tiene los permisos para estar acá
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  changeView(view: string) {
    this.activeView = view;
  }

  atenderAhora(expediente: string) {
    alert(`Atendiendo expediente: ${expediente}`);
  }

  // Métodos de Configuración
  t(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

  selectLanguage(code: 'es' | 'en'): void {
    this.currentLang = code;
    this.showLanguageDropdown = false;
  }

  toggleTheme(dark: boolean): void {
    this.isDarkMode = dark;
    if (dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  saveChanges(): void {
    alert('Cambios guardados correctamente');
  }

  deleteAccount(): void {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      alert('Cuenta eliminada');
      this.logout();
    }
  }
}
