import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-jefatura-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jefatura-dashboard.html',
  styleUrl: './jefatura-dashboard.css',
})
export class JefaturaDashboard implements OnInit {
  currentUser: User | null = null;
  activeView: 'inicio' | 'documents_received' | 'documents_signed' | 'documents_sent' | 'expedientes' | 'reportes' | 'configuracion' | 'generar_oficio'| 'sign_interface' = 'inicio' ;

  selectedDoc: { exp: string; paciente: string; remitente?: string; fecha?: string; } | null = null;

  viewerTabs: string[] = [];
  
  showDerivarModal = false;
  showViewerModal = false;

  userProfile = {
    nombre: 'Lina Rivas Morales',
    rol: 'Jefatura',
    cargo: 'Jefatura de Calidad',
    unidad: 'Dirección Médica',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop',
  };

  receivedDocs = [
    { exp: 'EXP-2024-120', paciente: 'María González', remitente: 'Unidad de Emergencias', fecha: '14 May 2024, 09:30 AM', estado: 'Media' },
    { exp: 'EXP-2024-121', paciente: 'José Hernández', remitente: 'Cirugía Mayor', fecha: '13 May 2024, 02:15 PM', estado: 'Urgente' },
    { exp: 'EXP-2024-122', paciente: 'Laura Rodríguez', remitente: 'Pediatría', fecha: '12 May 2024, 10:45 AM', estado: 'Baja' },
  ];

  signedDocs = [
    { exp: 'EXP-2024-083', paciente: 'Carlos P\u00e9rez', fecha: '11 May 2024, 11:20 AM', estado: 'Firmado' },
    { exp: 'EXP-2024-084', paciente: 'Ana Luc\u00eda', fecha: '10 May 2024, 03:45 PM', estado: 'Enviado' },
    { exp: 'EXP-2024-085', paciente: 'Ricardo Soto', fecha: '09 May 2024, 08:30 AM', estado: 'Firmado' },
  ];

  sentDocs = [
    { expediente: 'EXP-2024-001', paciente: 'Ricardo Mendoza', emisor: 'Lina Rivas', fechaEnvio: '12 Oct 2023, 08:30 AM', prioridad: 'Urgente' },
    { expediente: 'EXP-2024-042', paciente: 'Ana Luc\u00eda Torres', emisor: 'Lina Rivas', fechaEnvio: '14 Oct 2023, 10:15 AM', prioridad: 'Media' },
    { expediente: 'EXP-2023-988', paciente: 'Juan Gonz\u00e1lez', emisor: 'Lina Rivas', fechaEnvio: '08 Oct 2023, 03:45 PM', prioridad: 'Baja' },
  ];

  dailyReceivedCount = 18;
  pendingSignatureCount = 7;
  dailySignedCount = 12;
  dailySentCount = 9;

  // Pagination for Enviados
  pEnviados = 1;
  itemsPerPageEnviados = 3;
  searchTermEnviados = '';
  searchTermReceived = '';
  searchTermSigned = '';
  searchTermExpedientesDiseno = '';

  receivedDocsStats = {
    total: 128,
    nuevosHoy: 14,
    enRevision: 26,
    completados: 48,
  };

  signedTotalFirmados = 97;
  signedTotal = 97;

  expedientesStats = {
    nuevos: 18,
    pendientesFirma: 24,
    efectividad: '89%',
  };

  // Filters for Expedientes
  fechaRange = '01/01/2024 - 31/12/2024';
  estadoFilter = 'Todos los estados';
  prioridadFilter = 'Cualquier prioridad';
  pacienteFilterExpedientes = '';

  // Filters for Documents Received
  pacienteFilterReceived = 'Todos los pacientes';
  remitenteFilter = 'Todos los remitentes';
  fechaFilterReceived = 'Últimos 30 días';
  prioridadFilterReceived = 'Todas las prioridades';

  // Filters for Documents Signed
  pacienteFilterSigned = 'Todos los pacientes';
  fechaFilterSigned = 'Últimos 30 días';
  estadoFilterSigned = 'Cualquier estado';

  // Filters for Documents Sent
  pacienteFilterSent = 'Todos los pacientes';
  emisorFilter = 'Todos los emisores';
  fechaFilterSent = 'Últimos 30 días';
  prioridadFilterSent = 'Cualquier prioridad';

  expedientesListDiseno = [
    { nro: '#EXP-2024-001', paciente: 'Ricardo Mendoza', id: '87654546', fecha: '12 Oct, 2023', archivos: 12, estado: 'ABIERTO', initials: 'RM' },
    { nro: '#EXP-2024-042', paciente: 'Ana Lucía Torres', id: '10234567', fecha: '14 Oct, 2023', archivos: 5, estado: 'EN PROCESO', initials: 'AT' },
    { nro: '#EXP-2023-988', paciente: 'Juan González', id: '22881009', fecha: '08 Oct, 2023', archivos: 28, estado: 'CERRADO', initials: 'JG' },
  ];

  expTotalCount = 3;

  urgentExpedientes = [
    { expediente: 'EXP-2026-155', paciente: 'María López', recibido: '07 May 2026 · 09:18', estado: 'Urgente' },
    { expediente: 'EXP-2026-159', paciente: 'Juan Rivera', recibido: '07 May 2026 · 10:04', estado: 'Urgente' },
    { expediente: 'EXP-2026-163', paciente: 'Ana Torres', recibido: '07 May 2026 · 10:56', estado: 'Urgente' },
  ];

  recentSignatures = [
    { expediente: 'EXP-2026-101', paciente: 'Carlos Pinto', fecha: '07 May 2026', estado: 'Firmado' },
    { expediente: 'EXP-2026-108', paciente: 'Laura Mendoza', fecha: '07 May 2026', estado: 'Enviado' },
    { expediente: 'EXP-2026-112', paciente: 'Pedro Gómez', fecha: '07 May 2026', estado: 'Firmado' },
  ];

  // Historial pagination
  historialPage = 1;
  historialItemsPerPage = 10;
  totalSignatures = 25; // Total de registros en el historial

  expedientesList = [
    { 
      expediente: '#EXP-2024-001', 
      documento: 'DOC-1025',
      names: 'Ricardo', 
      surnames: 'Mendoza', 
      id: '87654546', 
      date: '12 Oct, 2023', 
      time: '08:30 AM', 
      docsCount: 12, 
      initials: 'RM', 
      avatarClass: 'avatarCyan' 
    },
    { 
      expediente: '#EXP-2024-042', 
      documento: 'DOC-1142',
      names: 'Ana Lucía', 
      surnames: 'Torres', 
      id: '10234567', 
      date: '14 Oct, 2023', 
      time: '10:15 AM', 
      docsCount: 5, 
      initials: 'AL', 
      avatarClass: 'avatarIndigo' 
    },
    { 
      expediente: '#EXP-2023-988', 
      documento: 'DOC-0985',
      names: 'Juan', 
      surnames: 'González', 
      id: '22881009', 
      date: '08 Oct, 2023', 
      time: '03:45 PM', 
      docsCount: 28, 
      initials: 'UG', 
      avatarClass: 'avatarPink' 
    }
  ];

  // Pagination State
  pExpedientes = 1;
  itemsPerPage = 3;
  searchTermExpedientes = '';

  reportCards = [
    { label: 'Documentos Recibidos', value: '128', change: '+8%', colorClass: 'card-teal' },
    { label: 'Documentos Firmados', value: '97', change: '+12%', colorClass: 'card-purple' },
    { label: 'Documentos Enviados', value: '54', change: '+6%', colorClass: 'card-blue' },
    { label: 'Tasa de Cumplimiento', value: '94.2%', change: '+1.4%', colorClass: 'card-green' },
  ];

  reportActivities = [
    { title: 'Informe de calidad mensual generado', detail: 'Reporte de auditoría enviado a la dirección.', estado: 'Completado', badgeClass: 'badge-completed' },
    { title: 'Revisión de protocolos de firma digital', detail: 'Actualización de criterios de validación.', estado: 'En proceso', badgeClass: 'badge-processing' },
    { title: 'Análisis de documentos pendientes', detail: 'Evaluación de cuellos de botella operativos.', estado: 'Urgente', badgeClass: 'badge-alert' },
  ];

  settings = {
    notifications: true,
    darkMode: false,
    emailReports: true,
    language: 'es',
  };

  languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user || user.role !== 'jefatura') {
        this.router.navigate(['/login']);
      }
    });
  }

  openSignInterface(doc: { exp: string; paciente: string; remitente?: string; fecha?: string; }): void {
    this.selectedDoc = doc;
    this.activeView = 'sign_interface';
  }

  cancelSignInterface(): void {
    this.selectedDoc = null;
    this.changeView('documents_received');
  }

  openOficioInterface(item: any): void {
  this.selectedDoc = item;
  this.activeView = 'generar_oficio';
  }

  cancelOficioInterface(): void {
    this.activeView = 'documents_received';
  }

  openDerivarModal(doc: any): void {
  this.selectedDoc = doc;
  this.showDerivarModal = true;
  }

  closeDerivarModal(): void {
    this.showDerivarModal = false;
  }

  openViewerModal(doc: any, type: string = '') {
  this.selectedDoc = doc;
  this.showViewerModal = true;

  // DOCUMENTOS RECIBIDOS
  if (type === 'received') {
    this.viewerTabs = [
      'Doc. Requerimiento',
      'Historia Clínica'
    ];
  }

  // DOCUMENTOS FIRMADOS
  else if (type === 'signed') {
    this.viewerTabs = [
      'Oficio',
      'Doc. Requerimiento'
    ];
  }

  // DOCUMENTOS ENVIADOS
  else if (type === 'sent') {
    this.viewerTabs = [
      'Oficio',
      'Doc. Requerimiento',
      'Historia Clínica'
    ];
  }

  // DEFAULT
  else {
    this.viewerTabs = ['Documento'];
  }
}
  closeViewerModal(): void {
    this.showViewerModal = false;
  }

  confirmSign(): void {
    if (!this.selectedDoc) {
      return;
    }
    this.selectedDoc = null;
    this.changeView('documents_signed');
  }

  changeView(view: 'inicio' | 'documents_received' | 'documents_signed' | 'documents_sent' | 'expedientes' | 'reportes' | 'configuracion' | 'sign_interface'): void {
    this.activeView = view;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getFilteredExpedientes() {
    let list = this.expedientesList;
    if (this.searchTermExpedientes) {
      const term = this.searchTermExpedientes.toLowerCase();
      list = list.filter(e => 
        e.expediente.toLowerCase().includes(term) || 
        e.names.toLowerCase().includes(term) ||
        e.surnames.toLowerCase().includes(term) ||
        e.id.toString().includes(term)
      );
    }
    return list;
  }

  getPaginatedExpedientes() {
    const list = this.getFilteredExpedientes();
    return list.slice((this.pExpedientes - 1) * this.itemsPerPage, this.pExpedientes * this.itemsPerPage);
  }

  onSearchExpedientes(event: any) {
    this.searchTermExpedientes = event.target.value;
    this.pExpedientes = 1;
  }

  getTotalPagesExpedientes(): number {
    return Math.ceil(this.getFilteredExpedientes().length / this.itemsPerPage);
  }

  getPagesArrayExpedientes(): number[] {
    const total = this.getTotalPagesExpedientes();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Enviados methods
  getFilteredEnviados() {
    let list = this.sentDocs;
    const term = this.normalize(this.searchTermEnviados);
    if (term) {
      list = list.filter(e =>
        this.normalize(e.expediente).includes(term) ||
        this.normalize(e.paciente).includes(term) ||
        this.normalize(e.emisor).includes(term) ||
        this.normalize(e.fechaEnvio).includes(term) ||
        this.normalize(e.prioridad).includes(term)
      );
    }

    if (this.pacienteFilterSent !== 'Todos los pacientes') {
      list = list.filter(e => e.paciente === this.pacienteFilterSent);
    }

    if (this.emisorFilter !== 'Todos los emisores') {
      list = list.filter(e => e.emisor === this.emisorFilter);
    }

    if (this.prioridadFilterSent !== 'Cualquier prioridad') {
      list = list.filter(e => e.prioridad === this.prioridadFilterSent);
    }

    return list;
  }

  getPaginatedEnviados() {
    const list = this.getFilteredEnviados();
    return list.slice((this.pEnviados - 1) * this.itemsPerPageEnviados, this.pEnviados * this.itemsPerPageEnviados);
  }

  onSearchEnviados(event: any) {
    this.searchTermEnviados = event.target.value;
    this.pEnviados = 1;
  }

  changePage(section: 'expedientes' | 'enviados', page: number) {
    if (section === 'expedientes') this.pExpedientes = page;
    if (section === 'enviados') this.pEnviados = page;
  }

  getTotalPagesEnviados(): number {
    return Math.ceil(this.getFilteredEnviados().length / this.itemsPerPageEnviados);
  }

  getPagesArrayEnviados(): number[] {
    const total = this.getTotalPagesEnviados();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  previewFile(doc: any) {
    // Lógica para previsualizar archivo
    console.log('Previsualizar:', doc);
  }

  getFilteredReceivedDocs() {
    let list = this.receivedDocs;
    const term = this.normalize(this.searchTermReceived);

    if (term) {
      list = list.filter(doc =>
        this.normalize(doc.exp).includes(term) ||
        this.normalize(doc.paciente).includes(term) ||
        this.normalize(doc.remitente).includes(term) ||
        this.normalize(doc.fecha).includes(term) ||
        this.normalize(doc.estado).includes(term)
      );
    }

    if (this.pacienteFilterReceived !== 'Todos los pacientes') {
      list = list.filter(doc => doc.paciente === this.pacienteFilterReceived);
    }

    if (this.remitenteFilter !== 'Todos los remitentes') {
      list = list.filter(doc => doc.remitente === this.remitenteFilter);
    }

    if (this.prioridadFilterReceived !== 'Todas las prioridades') {
      list = list.filter(doc => doc.estado === this.prioridadFilterReceived);
    }

    return list;
  }

  getFilteredSignedDocs() {
    let list = this.signedDocs;
    const term = this.normalize(this.searchTermSigned);

    if (term) {
      list = list.filter(doc =>
        this.normalize(doc.exp).includes(term) ||
        this.normalize(doc.paciente).includes(term) ||
        this.normalize(doc.fecha).includes(term) ||
        this.normalize(doc.estado).includes(term)
      );
    }

    if (this.pacienteFilterSigned !== 'Todos los pacientes') {
      list = list.filter(doc => doc.paciente === this.pacienteFilterSigned);
    }

    if (this.estadoFilterSigned !== 'Cualquier estado') {
      list = list.filter(doc => doc.estado === this.estadoFilterSigned);
    }

    return list;
  }

  getFilteredExpedientesDiseno() {
    let list = this.expedientesListDiseno;
    const searchTerm = this.normalize(this.searchTermExpedientesDiseno);
    const pacienteTerm = this.normalize(this.pacienteFilterExpedientes);

    if (searchTerm) {
      list = list.filter(exp =>
        this.normalize(exp.nro).includes(searchTerm) ||
        this.normalize(exp.paciente).includes(searchTerm) ||
        this.normalize(exp.id).includes(searchTerm) ||
        this.normalize(exp.fecha).includes(searchTerm) ||
        this.normalize(exp.estado).includes(searchTerm)
      );
    }

    if (pacienteTerm) {
      list = list.filter(exp =>
        this.normalize(exp.paciente).includes(pacienteTerm) ||
        this.normalize(exp.id).includes(pacienteTerm)
      );
    }

    if (this.estadoFilter !== 'Todos los estados') {
      list = list.filter(exp => exp.estado === this.estadoFilter);
    }

    return list;
  }

  onSearchReceived(event: any) {
    this.searchTermReceived = event.target.value;
  }

  onSearchSigned(event: any) {
    this.searchTermSigned = event.target.value;
  }

  onSearchExpedientesDiseno(event: any) {
    this.searchTermExpedientesDiseno = event.target.value;
  }

  private normalize(value: unknown): string {
    return String(value ?? '').toLowerCase().trim();
  }

  // Expedientes filters
  applyExpedientesFilters() {
    this.pExpedientes = 1;
  }

  // Received filters
  applyReceivedFilters() {
    // Los filtros se aplican en tiempo real mediante getFilteredReceivedDocs().
  }

  // Signed filters
  applySignedFilters() {
    // Los filtros se aplican en tiempo real mediante getFilteredSignedDocs().
  }

  // Sent filters
  applySentFilters() {
    this.pEnviados = 1;
  }

  // Historial methods
  atenderAhora(item: any) {

  this.selectedDoc = {
    exp: item.expediente,
    paciente: item.paciente
  };

  this.activeView = 'sign_interface';
}

  changeHistorialPage(page: number): void {
    this.historialPage = page;
  }

  get historialPagesArray(): number[] {
    const totalPages = Math.ceil(this.totalSignatures / this.historialItemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.totalSignatures / this.historialItemsPerPage);
  }
}
