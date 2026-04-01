import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  // Navigation State
  currentView: 'inicio' | 'usuarios' | 'digitalizacion' | 'digitalizacion-form' | 'reportes' | 'configuracion' = 'inicio';
  
  // Pagination State
  pInicio = 1;
  pUsuarios = 1;
  pDigi = 1;
  itemsPerPage = 3;
  
  searchTermUsuarios = '';
  searchTermDigi = '';
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

  // Admin Profile
  adminProfile = {
    nombre: 'Jorge Gonzales Rodriguez',
    especialidad: 'Estadística',
    colegiatura: 'CMP-459283',
    rol: 'Personal Administrativo'
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
    { id: '76543536', names: 'Carlos Alberto', surnames: 'Méndez Mendoza', date: '24 Oct, 2023 - 09:15', status: 'Finalizado' },
    { id: '35112903', names: 'Elena Sofía', surnames: 'Rodríguez Torres', date: '24 Oct, 2023 - 10:42', status: 'Finalizado' },
    { id: '19862331', names: 'Roberto Marcos', surnames: 'Gómez Villavicencio', date: '24 Oct, 2023 - 11:20', status: 'Finalizado' }
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

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  getSafeUrl(url: string | null): SafeResourceUrl | null {
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

  setView(view: 'inicio' | 'usuarios' | 'digitalizacion' | 'digitalizacion-form' | 'reportes' | 'configuracion'): void {
    this.currentView = view;
  }

  logout(): void {
    // In actual app, call authService.logout()
    this.router.navigate(['/login']);
  }

  // Operations
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

    // Add new record to list
    this.digitalizedDocs.unshift({
      id: this.selectedPatient.id,
      names: this.selectedPatient.name,
      surnames: this.selectedPatient.surname,
      date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Finalizado',
      fileUrl: this.uploadedFileUrl,
      fileName: this.uploadedFile.name,
      fileType: this.uploadedFile.type
    });

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

  closePreview() {
    this.previewModalVisible = false;
    this.previewUrl = null;
    this.selectedDoc = null;
  }
  getPaginatedInicio() {
    return this.pendingRequests.slice((this.pInicio - 1) * this.itemsPerPage, this.pInicio * this.itemsPerPage);
  }

  getPaginatedUsuarios() {
    let list = this.usersList;
    if (this.searchTermUsuarios) {
      const term = this.searchTermUsuarios.toLowerCase();
      list = list.filter(u => 
        u.names.toLowerCase().includes(term) || 
        u.surnames.toLowerCase().includes(term) || 
        u.email.toLowerCase().includes(term) ||
        u.id.toString().includes(term)
      );
    }
    return list.slice((this.pUsuarios - 1) * this.itemsPerPage, this.pUsuarios * this.itemsPerPage);
  }

  getPaginatedDigi() {
    let list = this.digitalizedDocs;
    if (this.searchTermDigi) {
      const term = this.searchTermDigi.toLowerCase();
      list = list.filter(d => 
        (d.names && d.names.toLowerCase().includes(term)) || 
        (d.surnames && d.surnames.toLowerCase().includes(term)) || 
        d.id.toString().includes(term)
      );
    }
    return list.slice((this.pDigi - 1) * this.itemsPerPage, this.pDigi * this.itemsPerPage);
  }

  onSearchUsuarios(event: any) {
    this.searchTermUsuarios = event.target.value;
    this.pUsuarios = 1; // Reset to page 1
  }

  onSearchDigi(event: any) {
    this.searchTermDigi = event.target.value;
    this.pDigi = 1; // Reset to page 1
  }

  changePage(section: 'inicio' | 'usuarios' | 'digi', page: number) {
    if (section === 'inicio') this.pInicio = page;
    if (section === 'usuarios') this.pUsuarios = page;
    if (section === 'digi') this.pDigi = page;
  }

  getTotalPagesDigi(): number {
    return Math.ceil(this.digitalizedDocs.length / this.itemsPerPage);
  }

  getPagesArrayDigi(): number[] {
    const total = this.getTotalPagesDigi();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getTotalPagesUsuarios(): number {
    return Math.ceil(this.usersList.length / this.itemsPerPage);
  }

  getPagesArrayUsuarios(): number[] {
    const total = this.getTotalPagesUsuarios();
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}
