import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  // Navigation State
  currentView: 'inicio' | 'usuarios' | 'digitalizacion' | 'digitalizacion-form' | 'expedientes' | 'documentos-enviados' | 'reportes' | 'configuracion' = 'inicio';
  
  // Pagination State
  pInicio = 1;
  pUsuarios = 1;
  pDigi = 1;
  pExpedientes = 1;
  pEnviados = 1;
  itemsPerPage = 3;

  searchTermUsuarios = '';
  searchTermDigi = '';
  searchTermExpedientes = '';
  searchTermEnviados = '';
  patientNotFound = false;
  
  // Selection/Upload State
  currentStep = 1;
  selectedPatient: any = null;
  uploadedFile: any = null;
  uploadedFileUrl: string | null = null;
  
  // Preview Modal State
  previewModalVisible = false;
  previewUrl: string | null = null;
  selectedDoc: any = null;
  sendModalVisible = false;
  derivativeData: any = {
    expediente: '#EXP-2024-089',
    fecha: '24/05/2024',
    prioridad: 'Media',
    emisor: 'Admin Usuario',
    unidad: 'Administración Central',
    cargo: 'Jefe de Digitalización'
  };

  // Admin Profile
  adminProfile = {
    nombre: 'Jorge Gonzales Rodriguez',
    especialidad: 'Estadística',
    colegiatura: 'CMP-459283',
    rol: 'Personal Administrativo',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop'
  };

  // Stats for Inicio
  stats = {
    activeUsers: '1,284',
    usersTrend: '+5.2%',
    validatedDocs: '450',
    docsTrend: '-2.1%',
    rejectedUsers: '12',
    rejectedTrend: '+2'
  };

  // Pending Register Requests
  pendingRequests: any[] = [
    {
      id: 1,
      initials: 'RG',
      names: 'Ricardo Esteban',
      surnames: 'García Pardo',
      email: 'ricardo.garcia@gmail.com',
      role: 'Médico Especialista',
      dept: 'Cardiología',
      date: 'Hace 2 horas',
      avatarClass: 'avatarCyan'
    },
    {
      id: 2,
      initials: 'AM',
      names: 'Ana Sofía',
      surnames: 'Martínez Torres',
      email: 'a.martinez99@hotmail.com',
      role: 'Médico Especialista',
      dept: 'Pediatría',
      date: 'Hace 5 horas',
      avatarClass: 'avatarPink'
    },
    {
      id: 3,
      initials: 'LC',
      names: 'Lucas Mateo',
      surnames: 'Castro Villegas',
      email: 'l.castro.v@outlook.com',
      role: 'Médico Especialista',
      dept: 'Medicina General',
      date: 'Ayer',
      avatarClass: 'avatarIndigo'
    }
  ];

  // Users List (Gestión de Usuarios)
  usersList = [
    {
      id: 1,
      names: 'Alejandro Rafael',
      surnames: 'Méndez Mendoza',
      email: 'amendez_md@gmail.com',
      dept: 'Cardiología',
      status: 'Activo',
      lastAccess: 'Hace 15 min',
      initials: 'AM',
      avatarClass: 'avatarCyan'
    },
    {
      id: 2,
      names: 'Elena Sofía',
      surnames: 'Rodríguez Torres',
      email: 'elenasofia_rt@hotmail.com',
      dept: 'Urgencias',
      status: 'Rechazado',
      lastAccess: 'Sin acceso',
      initials: 'ER',
      avatarClass: 'avatarPink'
    },
    {
      id: 3,
      names: 'Marcos Antonio',
      surnames: 'Silva Villegas',
      email: 'marcosilva@outlook.com',
      dept: 'Radiología',
      status: 'Activo',
      lastAccess: '24 Oct, 2023',
      initials: 'MS',
      avatarClass: 'avatarIndigo'
    }
  ];

  // Digitalized Documents List
  digitalizedDocs: any[] = [
    { 
      id: '76543536', 
      expediente: '#EXP-2024-536',
      documento: 'DOC-0089',
      names: 'Carlos Alberto', 
      surnames: 'Méndez Mendoza', 
      date: '24 Oct, 2023 - 09:15', 
      status: 'Finalizado',
      fileName: 'documento_escaneado_089.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    { 
      id: '35112903', 
      expediente: '#EXP-2024-112',
      documento: 'DOC-0112',
      names: 'Elena Sofía', 
      surnames: 'Rodríguez Torres', 
      date: '24 Oct, 2023 - 10:42', 
      status: 'Finalizado' 
    },
    { 
      id: '19862331', 
      expediente: '#EXP-2024-045',
      documento: 'DOC-0045',
      names: 'Roberto Marcos', 
      surnames: 'Gómez Villavicencio', 
      date: '24 Oct, 2023 - 11:20', 
      status: 'Finalizado' 
    }
  ];

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

  sentDocuments = [
    { 
      expediente: '#EXP-2024-089-F', 
      documento: 'DOC-0654',
      emisor: 'Admin Usuario', 
      emisorInitials: 'AU', 
      date: '24 Oct, 2024', 
      time: '09:15 AM',
      fileName: 'expediente_cardio_089.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    { 
      expediente: '#EXP-2024-112-A', 
      documento: 'DOC-0782',
      emisor: 'Admin Usuario', 
      emisorInitials: 'AU', 
      date: '22 Oct, 2024', 
      time: '10:45 AM',
      fileName: 'expediente_pediatria_112.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    { 
      expediente: '#EXP-2024-045-C', 
      documento: 'DOC-0921',
      emisor: 'Admin Usuario', 
      emisorInitials: 'AU', 
      date: '21 Oct, 2024', 
      time: '11:20 AM',
      fileName: 'expediente_general_045.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  ];

  // Report Stats
  reportStats = {
    totalRegistros: '1,240',
    registrosTrend: '+14%',
    historiasDigitalizadas: '1,240',
    historiasMeta: '4,000',
    indiceIntegridad: '99.8%',
    integridadEstado: 'Excelente',
    // Nuevos datos para el reporte premium
    pendientesValidacion: 42,
    pendientesTrend: '+10%',
    tiempoAprobacionH: 18,
    tiempoAprobacionM: 45,
    tasaAceptacion: 82,
    tasaAceptacionAprobados: '1,248',
    tasaAceptacionRechazados: '274',
    estadoGlobalCompletado: 70,
    estadoGlobalDocumentos: '14,280',
    estadoGlobalPendientes: '1,500'
  };

  productividadUsuarios = [
    { nombre: 'Marta Rodríguez', cantidad: '450 Historias', pct: 90 },
    { nombre: 'Carlos Méndez', cantidad: '340 Historias', pct: 68 },
    { nombre: 'Lucía Torres', cantidad: '210 Historias', pct: 45 },
    { nombre: 'Jorge Ruiz', cantidad: '160 Historias', pct: 32 }
  ];

  validacionesRecientes = [
    {
      medico: 'Dr. Roberto G.',
      especialidad: 'Cardiología',
      fecha: '24/10/2023 - 10:20',
      estado: 'Pendiente',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop'
    },
    {
      medico: 'Dra. Elena S.',
      especialidad: 'Pediatría',
      fecha: '24/10/2023 - 08:45',
      estado: 'Aprobado',
      img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop'
    }
  ];

  // Mock Patients for Digitalization Form
  patientsDB = [
    { id: '76543536', name: 'Carlos Alberto', surname: 'Méndez Mendoza', initials: 'CM', avatarClass: 'avatarCyan' },
    { id: '35112903', name: 'Elena Sofía', surname: 'Rodríguez Torres', initials: 'ER', avatarClass: 'avatarPink' },
    { id: '19862331', name: 'Roberto Marcos', surname: 'Gómez Villavicencio', initials: 'RG', avatarClass: 'avatarIndigo' }
  ];

  constructor(
    private router: Router, 
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    // Get current user info from auth service
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.adminProfile.nombre = currentUser.name || currentUser.username;
    }
  }

  getSafeUrl(url: string | null): SafeResourceUrl | null {
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

  setView(view: 'inicio' | 'usuarios' | 'digitalizacion' | 'digitalizacion-form' | 'expedientes' | 'documentos-enviados' | 'reportes' | 'configuracion'): void {
    this.currentView = view;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Operations
  viewDetails(reqId: number): void {
    alert(`Visualizando detalles de la solicitud ID: ${reqId}`);
  }

  validateRequest(reqId: number): void {
    const request = this.pendingRequests.find(r => r.id === reqId);
    if (request) {
      this.usersList.unshift({
        id: this.usersList.length + 1,
        names: request.names,
        surnames: request.surnames,
        email: request.email,
        dept: request.dept,
        status: 'Activo',
        lastAccess: 'Recién validado',
        initials: request.initials || '??',
        avatarClass: request.avatarClass || 'avatarCyan'
      });
      this.pendingRequests = this.pendingRequests.filter(r => r.id !== reqId);
    }
  }

  rejectRequest(reqId: number): void {
    const request = this.pendingRequests.find(r => r.id === reqId);
    if (request) {
      this.usersList.unshift({
        id: this.usersList.length + 1,
        names: request.names,
        surnames: request.surnames,
        email: request.email,
        dept: request.dept,
        status: 'Rechazado',
        lastAccess: 'Sin acceso',
        initials: request.initials || '??',
        avatarClass: request.avatarClass || 'avatarCyan'
      });
      this.pendingRequests = this.pendingRequests.filter(r => r.id !== reqId);
    }
  }

  // Digitalization Form Logic
  onFormSearchPatient(event: any) {
    const term = event.target.value.toLowerCase();
    this.patientNotFound = false;
    this.selectedPatient = null;
    
    if (term.length > 2) {
      const match = this.patientsDB.find(p => 
        p.id.includes(term) || 
        p.name.toLowerCase().includes(term) || 
        p.surname.toLowerCase().includes(term)
      );

      if (match) {
        this.selectedPatient = match;
      } else if (term.length >= 8) {
        this.patientNotFound = true;
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Exclusive PDF validation
      if (file.type !== 'application/pdf') {
        alert('Por favor, seleccione un archivo PDF. El sistema ya no acepta imágenes por protocolo de seguridad.');
        // Reset file input if needed
        event.target.value = '';
        return;
      }
      this.uploadedFile = file;
      // Generate preview URL
      this.uploadedFileUrl = URL.createObjectURL(file);
    }
  }

  triggerFileUpload(input: HTMLInputElement) {
    input.click();
  }

  processDigitalization() {
    if (!this.selectedPatient || !this.uploadedFile) {
      alert('Por favor seleccione un paciente y suba un archivo.');
      return;
    }

    const randomExp = Math.floor(100 + Math.random() * 900);
    const randomDoc = Math.floor(1000 + Math.random() * 9000);
    const expNum = `#EXP-2024-${randomExp}`;
    const docNum = `DOC-${randomDoc}`;

    this.digitalizedDocs.unshift({
      id: this.selectedPatient.id,
      expediente: expNum,
      documento: docNum,
      names: this.selectedPatient.name,
      surnames: this.selectedPatient.surname,
      date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Finalizado',
      fileUrl: this.uploadedFileUrl,
      fileName: this.uploadedFile.name,
      fileType: this.uploadedFile.type
    });

    // Sincronizar con Gestión de Expedientes
    const existingExp = this.expedientesList.find(e => e.id === this.selectedPatient.id);
    if (existingExp) {
      existingExp.docsCount++;
    } else {
      this.expedientesList.unshift({
        expediente: expNum,
        documento: docNum,
        names: this.selectedPatient.name,
        surnames: this.selectedPatient.surname,
        id: this.selectedPatient.id,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ').replace(',', ''), // Ex: 12 Oct, 2023
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), // Ex: 08:30 AM
        docsCount: 1,
        initials: this.selectedPatient.initials,
        avatarClass: this.selectedPatient.avatarClass
      });
      // Ajuste fino del formato de fecha para la coma
      const lastExp = this.expedientesList[0];
      const dateParts = lastExp.date.split(' ');
      if (dateParts.length === 3) {
        lastExp.date = `${dateParts[0]} ${dateParts[1]}, ${dateParts[2]}`;
      }
    }

    // Reset and return
    this.selectedPatient = null;
    this.uploadedFile = null;
    this.uploadedFileUrl = null;
    this.currentStep = 1;
    this.setView('digitalizacion');
    alert('Documento procesado correctamente y cargado al sistema.');
  }

  previewFile(doc: any) {
    if (doc.fileUrl) {
      let url = doc.fileUrl;
      // If it's a PDF, add view parameters for precise 80% zoom
      if (doc.fileType?.includes('pdf') || !doc.fileType) {
        url += '#toolbar=0&navpanes=0&zoom=80';
      }
      this.previewUrl = url;
      this.selectedDoc = doc;
      this.previewModalVisible = true;
    } else {
      alert('Previsualización no disponible para este documento de prueba.');
    }
  }

  downloadFile(doc: any) {
    if (doc.fileUrl) {
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = doc.fileName || 'documento-digitalizado';
      link.click();
    } else {
      alert('Descarga no disponible para este documento de prueba.');
    }
  }

  sendDocument(doc: any) {
    this.selectedDoc = doc;
    // Mock data for the modal based on doc if possible, or use defaults
    this.derivativeData.expediente = '#EXP-2024-' + (doc.id?.slice(-3) || '089');
    this.derivativeData.fecha = new Date().toLocaleDateString();
    this.sendModalVisible = true;
  }

  closeSendModal() {
    this.sendModalVisible = false;
  }

  processDerivation() {
    if (this.selectedDoc) {
      const now = new Date();
      
      // Formato manual para asegurar HH:MM AM/PM (ej: 09:15 AM)
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // la hora '0' debe ser '12'
      const timeStr = hours.toString().padStart(2, '0') + ':' + minutes + ' ' + ampm;
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateStr = now.getDate().toString().padStart(2, '0') + ' ' + months[now.getMonth()] + ', ' + now.getFullYear();

      const newSentDoc = {
        expediente: this.derivativeData.expediente,
        documento: this.selectedDoc.documento,
        emisor: this.adminProfile.nombre,
        emisorInitials: 'AU',
        date: dateStr,
        time: timeStr,
        fileName: this.selectedDoc.fileName || 'documento.pdf',
        fileUrl: this.selectedDoc.fileUrl
      };

      // Add to sent list (at the beginning)
      this.sentDocuments.unshift(newSentDoc);
      
      alert(`Documento ${this.derivativeData.expediente} derivado correctamente.`);
      this.closeSendModal();
    }
  }

  closePreview() {
    this.previewModalVisible = false;
    this.previewUrl = null;
    // No reseteamos selectedDoc aquí para evitar que el modal de derivación pierda los datos si está abierto.
  }
  getPaginatedInicio() {
    return this.pendingRequests.slice((this.pInicio - 1) * this.itemsPerPage, this.pInicio * this.itemsPerPage);
  }

  getFilteredUsuarios() {
    let list = this.usersList;
    if (this.searchTermUsuarios) {
      const term = this.searchTermUsuarios.toLowerCase();
      list = list.filter(u => 
        u.names.toLowerCase().includes(term) || 
        u.surnames.toLowerCase().includes(term) || 
        u.email.toLowerCase().includes(term) ||
        (u.id && u.id.toString().includes(term))
      );
    }
    return list;
  }

  getPaginatedUsuarios() {
    const list = this.getFilteredUsuarios();
    return list.slice((this.pUsuarios - 1) * this.itemsPerPage, this.pUsuarios * this.itemsPerPage);
  }

  getFilteredEnviados() {
    let list = this.sentDocuments;
    if (this.searchTermEnviados) {
      const term = this.searchTermEnviados.toLowerCase();
      list = list.filter(d => 
        d.expediente.toLowerCase().includes(term) || 
        d.emisor.toLowerCase().includes(term)
      );
    }
    return list;
  }

  getPaginatedEnviados() {
    const list = this.getFilteredEnviados();
    return list.slice((this.pEnviados - 1) * this.itemsPerPage, this.pEnviados * this.itemsPerPage);
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

  getFilteredDigi() {
    let list = this.digitalizedDocs;
    if (this.searchTermDigi) {
      const term = this.searchTermDigi.toLowerCase();
      list = list.filter(d => 
        (d.names && d.names.toLowerCase().includes(term)) || 
        (d.surnames && d.surnames.toLowerCase().includes(term)) || 
        (d.id && d.id.toString().includes(term)) ||
        (d.expediente && d.expediente.toLowerCase().includes(term)) ||
        (d.documento && d.documento.toLowerCase().includes(term))
      );
    }
    return list;
  }

  getPaginatedDigi() {
    const list = this.getFilteredDigi();
    return list.slice((this.pDigi - 1) * this.itemsPerPage, this.pDigi * this.itemsPerPage);
  }

  onSearchUsuarios(event: any) {
    this.searchTermUsuarios = event.target.value;
    this.pUsuarios = 1;
  }

  onSearchDigi(event: any) {
    this.searchTermDigi = event.target.value;
    this.pDigi = 1;
  }

  onSearchExpedientes(event: any) {
    this.searchTermExpedientes = event.target.value;
    this.pExpedientes = 1;
  }

  onSearchEnviados(event: any) {
    this.searchTermEnviados = event.target.value;
    this.pEnviados = 1;
  }

  changePage(section: 'inicio' | 'usuarios' | 'digi' | 'expedientes' | 'enviados', page: number) {
    if (section === 'inicio') this.pInicio = page;
    if (section === 'usuarios') this.pUsuarios = page;
    if (section === 'digi') this.pDigi = page;
    if (section === 'expedientes') this.pExpedientes = page;
    if (section === 'enviados') this.pEnviados = page;
  }

  getTotalPagesUsuarios(): number {
    return Math.ceil(this.getFilteredUsuarios().length / this.itemsPerPage);
  }

  getPagesArrayUsuarios(): number[] {
    const total = this.getTotalPagesUsuarios();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getTotalPagesDigi(): number {
    return Math.ceil(this.getFilteredDigi().length / this.itemsPerPage);
  }

  getPagesArrayDigi(): number[] {
    const total = this.getTotalPagesDigi();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getTotalPagesExpedientes(): number {
    return Math.ceil(this.getFilteredExpedientes().length / this.itemsPerPage);
  }

  getPagesArrayExpedientes(): number[] {
    const total = this.getTotalPagesExpedientes();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getTotalPagesEnviados(): number {
    return Math.ceil(this.getFilteredEnviados().length / this.itemsPerPage);
  }

  getPagesArrayEnviados(): number[] {
    const total = this.getTotalPagesEnviados();
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}
