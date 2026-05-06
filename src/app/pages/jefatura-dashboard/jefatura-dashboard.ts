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
  activeView: 'inicio' | 'documents_received' | 'documents_signed' | 'documents_sent' | 'expedientes' | 'reportes' | 'configuracion' = 'inicio';

  userProfile = {
    nombre: 'Lina Rivas Morales',
    rol: 'Jefatura',
    cargo: 'Jefatura de Calidad',
    unidad: 'Dirección Médica',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop',
  };

  receivedDocs = [
    { exp: 'EXP-2024-120', doc: 'DOC-9021', remitente: 'Unidad de Emergencias', fecha: '14 May 2024', estado: 'Pendiente' },
    { exp: 'EXP-2024-121', doc: 'DOC-9054', remitente: 'Cirugía Mayor', fecha: '13 May 2024', estado: 'En revisión' },
    { exp: 'EXP-2024-122', doc: 'DOC-9087', remitente: 'Pediatría', fecha: '12 May 2024', estado: 'Recibido' },
  ];

  signedDocs = [
    { exp: 'EXP-2024-083', doc: 'DOC-8461', paciente: 'Carlos Pérez', fecha: '11 May 2024', estado: 'Firmado' },
    { exp: 'EXP-2024-084', doc: 'DOC-8478', paciente: 'Ana Lucía', fecha: '10 May 2024', estado: 'Firmado' },
    { exp: 'EXP-2024-085', doc: 'DOC-8490', paciente: 'Ricardo Soto', fecha: '09 May 2024', estado: 'Observado' },
  ];

  sentDocs = [
    { exp: 'EXP-2024-063', doc: 'DOC-8120', destino: 'Fiscalía', fecha: '08 May 2024', estado: 'Enviado' },
    { exp: 'EXP-2024-064', doc: 'DOC-8137', destino: 'HR', fecha: '07 May 2024', estado: 'Entregado' },
    { exp: 'EXP-2024-065', doc: 'DOC-8149', destino: 'Sede Central', fecha: '06 May 2024', estado: 'Enviado' },
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

  changeView(view: 'inicio' | 'documents_received' | 'documents_signed' | 'documents_sent' | 'expedientes' | 'reportes' | 'configuracion'): void {
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

  changePage(section: 'expedientes', page: number) {
    if (section === 'expedientes') this.pExpedientes = page;
  }

  getTotalPagesExpedientes(): number {
    return Math.ceil(this.getFilteredExpedientes().length / this.itemsPerPage);
  }

  getPagesArrayExpedientes(): number[] {
    const total = this.getTotalPagesExpedientes();
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}
