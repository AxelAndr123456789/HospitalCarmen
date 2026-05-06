import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-direccion-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './direccion-dashboard.html',
  styleUrl: './direccion-dashboard.css',
})
export class DireccionDashboard implements OnInit {
  currentUser: User | null = null;
  activeView: 'inicio' | 'documents_received' | 'documents_signed' | 'documents_sent' | 'expedientes' | 'reportes' | 'configuracion' = 'inicio';

  userProfile = {
    nombre: 'Ana María Torres',
    rol: 'Dirección',
    cargo: 'Dirección Médica',
    unidad: 'Hospital El Carmen',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
  };

  receivedDocs = [
    { exp: 'EXP-2024-203', doc: 'DOC-9142', remitente: 'Unidad de Emergencias', fecha: '15 May 2024', estado: 'Pendiente' },
    { exp: 'EXP-2024-204', doc: 'DOC-9165', remitente: 'Cirugía Mayor', fecha: '14 May 2024', estado: 'En revisión' },
    { exp: 'EXP-2024-205', doc: 'DOC-9189', remitente: 'Pediatría', fecha: '13 May 2024', estado: 'Recibido' },
  ];

  signedDocs = [
    { exp: 'EXP-2024-090', doc: 'DOC-8565', paciente: 'María Gómez', fecha: '12 May 2024', estado: 'Firmado' },
    { exp: 'EXP-2024-091', doc: 'DOC-8582', paciente: 'José Ramos', fecha: '11 May 2024', estado: 'Firmado' },
    { exp: 'EXP-2024-092', doc: 'DOC-8597', paciente: 'Lucía Peña', fecha: '10 May 2024', estado: 'Observado' },
  ];

  sentDocs = [
    { exp: 'EXP-2024-073', doc: 'DOC-8225', destino: 'Fiscalía', fecha: '09 May 2024', estado: 'Enviado' },
    { exp: 'EXP-2024-074', doc: 'DOC-8236', destino: 'HR', fecha: '08 May 2024', estado: 'Entregado' },
    { exp: 'EXP-2024-075', doc: 'DOC-8257', destino: 'Sede Central', fecha: '07 May 2024', estado: 'Enviado' },
  ];

  expedientesList = [
    {
      expediente: '#EXP-2024-201',
      documento: 'DOC-1302',
      names: 'Carla',
      surnames: 'Mendoza',
      id: '87654321',
      date: '16 Oct, 2023',
      time: '09:00 AM',
      docsCount: 10,
      initials: 'CM',
      avatarClass: 'avatarCyan'
    },
    {
      expediente: '#EXP-2024-202',
      documento: 'DOC-1318',
      names: 'Ricardo',
      surnames: 'Torres',
      id: '10234568',
      date: '17 Oct, 2023',
      time: '11:30 AM',
      docsCount: 7,
      initials: 'RT',
      avatarClass: 'avatarIndigo'
    },
    {
      expediente: '#EXP-2024-203',
      documento: 'DOC-1324',
      names: 'Sofía',
      surnames: 'Rojas',
      id: '22881008',
      date: '18 Oct, 2023',
      time: '02:15 PM',
      docsCount: 18,
      initials: 'SR',
      avatarClass: 'avatarPink'
    }
  ];

  pExpedientes = 1;
  itemsPerPage = 3;
  searchTermExpedientes = '';

  reportCards = [
    { label: 'Documentos Recibidos', value: '142', change: '+9%', colorClass: 'card-teal' },
    { label: 'Documentos Firmados', value: '104', change: '+11%', colorClass: 'card-purple' },
    { label: 'Documentos Enviados', value: '61', change: '+7%', colorClass: 'card-blue' },
    { label: 'Tasa de Cumplimiento', value: '96.4%', change: '+2.1%', colorClass: 'card-green' },
  ];

  reportActivities = [
    { title: 'Revisión de protocolos de atención', detail: 'Informe entregado a la junta directiva.', estado: 'Completado', badgeClass: 'badge-completed' },
    { title: 'Monitoreo de tiempos de firma', detail: 'Se evaluaron los procesos de firma digital.', estado: 'En proceso', badgeClass: 'badge-processing' },
    { title: 'Actualización de indicadores', detail: 'Se incorporaron nuevos KPI de desempeño.', estado: 'Urgente', badgeClass: 'badge-alert' },
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
      if (!user || user.role !== 'direccion') {
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
