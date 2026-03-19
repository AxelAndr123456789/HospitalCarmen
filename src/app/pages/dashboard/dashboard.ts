import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Estado para alternar entre las diferentes vistas
  currentView:
    | 'list'
    | 'preview'
    | 'historias'
    | 'pendientes'
    | 'firmados'
    | 'configuracion'
    | 'create-story' = 'list';

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
      sidebarTitle: 'HOSPITAL<br>EL CARMEN',
      sidebarSubtitle: 'GESTIÓN MÉDICA',
      navInicio: 'Inicio',
      navHistorias: 'Historias Clínicas',
      navPendientes: 'Documentos Pendientes',
      navFirmados: 'Documentos Firmados',
      navConfig: 'Configuración',
      logout: 'Cerrar Sesión',
      welcome: 'Bienvenido, Dr. Pérez',
      activitySummary: 'Resumen de actividad para hoy, 24 de Octubre',
      statsHistorias: 'Historias del Día',
      statsPendientes: 'Pendientes de Firma',
      statsFirmados: 'Documentos Firmados',
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
      pendingDocs: 'Documentos',
      signedDocs: 'Firmados',
    },
    en: {
      sidebarTitle: 'EL CARMEN<br>HOSPITAL',
      sidebarSubtitle: 'MEDICAL MANAGEMENT',
      navInicio: 'Home',
      navHistorias: 'Clinical Histories',
      navPendientes: 'Pending Documents',
      navFirmados: 'Signed Documents',
      navConfig: 'Settings',
      logout: 'Logout',
      welcome: 'Welcome, Dr. Pérez',
      activitySummary: 'Activity summary for today, October 24',
      statsHistorias: "Today's Histories",
      statsPendientes: 'Pending Signature',
      statsFirmados: 'Signed Documents',
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
      pendingDocs: 'Documents',
      signedDocs: 'Signed',
    },
  };

  // Datos del perfil del usuario
  userProfile = {
    nombre: 'Juan Pérez Rodríguez',
    especialidad: 'Cirugía General',
    colegiatura: 'CMP-459283',
    rol: 'Médico',
  };

  // Datos del paciente seleccionado para previsualización
  selectedPatient: any = {
    nombre: 'Carlos Alberto Ruiz Mendez',
    dni: '45890231',
    edad: '45 años',
    servicio: 'Cardiología',
    fecha: '12/05/2024',
    history: [
      {
        fecha: '10/05/2024',
        diagnostico: 'Gripe estacional con complicaciones menores.',
        resumen: 'Paciente presenta fiebre y tos seca. Se recomienda reposo.',
        tratamiento: '• Paracetamol 500mg cada 8h.\n• Abundantes líquidos.'
      },
      {
        fecha: '12/05/2024',
        diagnostico: 'Pneumonia bacteriana no especificada (J15.9). Hipertensión arterial esencial (I10).',
        resumen: 'Paciente ingresa por cuadro de dificultad respiratoria, fiebre de 39°C y tos productiva.',
        tratamiento: '• Continuar con Amoxicilina/Ácido Clavulánico 875/125mg c/12h por 5 días.\n• Control por consultorio externo en 7 días.'
      }
    ]
  };

  activeTab: string = '12/05/2024';

  setTab(date: string): void {
    this.activeTab = date;
    const historyItem = this.selectedPatient.history?.find((h: any) => h.fecha === date);
    if (historyItem) {
      this.selectedPatient.fecha = historyItem.fecha;
      this.selectedPatient.diagnostico = historyItem.diagnostico;
      this.selectedPatient.resumen = historyItem.resumen;
      this.selectedPatient.tratamiento = historyItem.tratamiento;
      this.selectedPatient.prioridad = historyItem.prioridad || 'No urgente';
    }
  }
  pageSize: number = 4;

  // Lista de historias clínicas/pacientes
  pacientesList: any[] = [
    {
      avatarColor: 'avatarGA',
      initials: 'AG',
      nombre: 'Alejandro Jacinto, García Mendoza',
      subInfo: 'Masculino, 42 años',
      dni: '20455321',
      edad: '42 años',
      visitDate: new Date(2024, 4, 12),
      visitDept: 'CARDIOLOGÍA',
      servicio: 'Cardiología',
      fecha: '12/05/2024',
      history: [
        {
          fecha: '12/05/2024',
          diagnostico:
            'Pneumonia bacteriana no especificada (J15.9). Hipertensión arterial esencial (I10).',
          resumen:
            'Paciente ingresa por cuadro de dificultad respiratoria, fiebre de 39°C y tos productiva.',
          tratamiento:
            '• Continuar con Amoxicilina/Ácido Clavulánico 875/125mg c/12h por 5 días.\n• Control por consultorio externo en 7 días.',
          prioridad: 'Urgente',
        },
      ],
    },
    {
      avatarColor: 'avatarML',
      initials: 'LM',
      nombre: 'Laura Sofia, Martínez Torres',
      subInfo: 'Femenino, 29 años',
      dni: '35988112',
      edad: '29 años',
      visitDate: new Date(2024, 4, 8),
      visitDept: 'CARDIOLOGÍA',
      servicio: 'Cardiología',
      fecha: '08/05/2024',
    },
    {
      avatarColor: 'avatarGR',
      initials: 'RG',
      nombre: 'Ricardo Esteban, Gómez Pardo',
      subInfo: 'Masculino, 45 años',
      dni: '48920132',
      edad: '45 años',
      visitDate: new Date(2023, 9, 12, 9, 30),
      visitDept: 'CARDIOLOGÍA',
      servicio: 'Cardiología',
      fecha: '12/10/2023',
    },
    {
      avatarColor: 'avatarSV',
      initials: 'VS',
      nombre: 'Valentina María, Sosa Villegas',
      subInfo: 'Femenino, 12 años',
      dni: '48332990',
      edad: '12 años',
      visitDate: new Date(2024, 4, 2),
      visitDept: 'CARDIOLOGÍA',
      servicio: 'Cardiología',
    },
  ];

  // Lista de documentos pendientes para la vista de Pendientes
  pendientesList: any[] = [
    {
      nombre: 'Ricardo Esteban, Gómez Pardo',
      dni: '48920132',
      edad: '45 años',
      servicio: 'Cardiología',
      fecha: '12/10/2023',
      emision: '12 Oct, 2023 - 09:30 AM',
      prioridad: 'Urgente',
    },
    {
      nombre: 'Marta Elena, Rodríguez Salas',
      dni: '53210988',
      edad: '29 años',
      servicio: 'Cardiología',
      fecha: '12/10/2023',
      emision: '12 Oct, 2023 - 10:15 AM',
      prioridad: 'No urgente',
    },
    {
      nombre: 'Carlos Augusto, Méndez Prado',
      dni: '39420011',
      edad: '55 años',
      servicio: 'Cardiología',
      fecha: '11/10/2023',
      emision: '11 Oct, 2023 - 04:45 PM',
      prioridad: 'No urgente',
    },
    {
      nombre: 'Ana Lucía, Torres Vaca',
      dni: '47102934',
      edad: '42 años',
      servicio: 'Cardiología',
      fecha: '11/10/2023',
      emision: '11 Oct, 2023 - 11:20 AM',
      prioridad: 'Urgente',
    },
  ];

  // Getter dinámico para el Dashboard (solo urgentes de la lista de pendientes)
  get dashboardUrgentes(): any[] {
    return this.pendientesList.filter(p => p.prioridad === 'Urgente');
  }

  // Lista de documentos firmados (Validados)
  firmadosList: any[] = [
    {
      nombre: 'Carlos Alberto, Ruiz Méndez',
      dni: '48920132',
      fechaVal: '24 May, 2024',
      horaVal: '10:45 AM',
      estado: 'Válido',
    },
    {
      nombre: 'Elena Sofia, Martínez Soler',
      dni: '53210988',
      fechaVal: '23 May, 2024',
      horaVal: '04:20 PM',
      estado: 'Válido',
    },
    {
      nombre: 'Jordi Andrés, Vila Costa',
      dni: '39420011',
      fechaVal: '23 May, 2024',
      horaVal: '09:15 AM',
      estado: 'Válido',
    },
    {
      nombre: 'Beatriz Adriana, García Luna',
      dni: '47102934',
      fechaVal: '22 May, 2024',
      horaVal: '02:30 PM',
      estado: 'Válido',
    },
  ];

  newPacienteData = {
    nombres: '',
    apellidos: '',
    dni: '',
    edad: '',
    sexo: 'Masculino',
    prioridad: 'No urgente',
    diagnostico: '',
    resumen: '',
    tratamiento: '',
  };

  get todayHistoriesCount(): number {
    const today = new Date().toDateString();
    return this.pacientesList.filter((p) => {
      if (p.visitDate instanceof Date) {
        return p.visitDate.toDateString() === today;
      }
      return false;
    }).length;
  }

  get pendingDocsCount(): number {
    return this.pendientesList.length;
  }

  get activitySummary(): string {
    const now = new Date();
    const day = now.getDate();
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const month = months[now.getMonth()];
    if (this.currentLang === 'es') {
      return `Resumen de actividad para hoy, ${day} de ${month}`;
    } else {
      return `Activity summary for today, ${month} ${day}`;
    }
  }

  get signedDocsCount(): number {
    return this.firmadosList.length;
  }

  get historicalGrowth(): string {
    if (this.todayHistoriesCount === 0) return '0%';
    // Simulación: cada historia hoy representa un crecimiento progresivo
    const growth = this.todayHistoriesCount * 4;
    return `+${growth}%`;
  }

  currentPageFirmados: number = 1;
  currentPageHistorias: number = 1;
  currentPagePendientes: number = 1;
  currentPageInicio: number = 1;

  setPageInicio(page: number): void {
    this.currentPageInicio = page;
  }

  nextPageInicio(): void {
    if (this.currentPageInicio < this.totalPagesInicio) {
      this.currentPageInicio++;
    }
  }

  prevPageInicio(): void {
    if (this.currentPageInicio > 1) {
      this.currentPageInicio--;
    }
  }

  setPageFirmados(page: number): void {
    this.currentPageFirmados = page;
  }

  nextPageFirmados(): void {
    if (this.currentPageFirmados < this.totalPagesFirmados) {
      this.currentPageFirmados++;
    }
  }

  prevPageFirmados(): void {
    if (this.currentPageFirmados > 1) {
      this.currentPageFirmados--;
    }
  }

  setPageHistorias(page: number): void {
    this.currentPageHistorias = page;
  }

  nextPageHistorias(): void {
    if (this.currentPageHistorias < this.totalPagesHistorias) {
      this.currentPageHistorias++;
    }
  }

  prevPageHistorias(): void {
    if (this.currentPageHistorias > 1) {
      this.currentPageHistorias--;
    }
  }

  setPagePendientes(page: number): void {
    this.currentPagePendientes = page;
  }

  nextPagePendientes(): void {
    if (this.currentPagePendientes < this.totalPagesPendientes) {
      this.currentPagePendientes++;
    }
  }

  prevPagePendientes(): void {
    if (this.currentPagePendientes > 1) {
      this.currentPagePendientes--;
    }
  }

  searchText: string = '';
  isFs: boolean = false;
  isNewConsultation: boolean = false;
  isSigningMode: boolean = false;
  showCustomAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';
  alertType: 'info' | 'warning' | 'success' = 'info';

  triggerAlert(title: string, message: string, type: 'info' | 'warning' | 'success' = 'info'): void {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;
    this.showCustomAlert = true;
  }

  closeAlert(): void {
    this.showCustomAlert = false;
  }

  get filteredPacientesList() {
    if (!this.searchText.trim()) return this.pacientesList;
    const search = this.searchText.toLowerCase();
    return this.pacientesList.filter(
      (p: any) =>
        p.nombre.toLowerCase().includes(search) ||
        p.dni.toLowerCase().includes(search) ||
        (p.apellidos && p.apellidos.toLowerCase().includes(search)),
    );
  }

  get filteredPacientes() {
    const start = (this.currentPageHistorias - 1) * this.pageSize;
    return this.filteredPacientesList.slice(start, start + this.pageSize);
  }

  get totalPagesHistorias(): number {
    return Math.ceil(this.filteredPacientesList.length / this.pageSize) || 1;
  }

  get filteredPendientesList() {
    if (!this.searchText.trim()) return this.pendientesList;
    const search = this.searchText.toLowerCase();
    return this.pendientesList.filter(
      (p) => p.nombre.toLowerCase().includes(search) || p.dni.toLowerCase().includes(search),
    );
  }

  get filteredPendientes() {
    const start = (this.currentPagePendientes - 1) * this.pageSize;
    return this.filteredPendientesList.slice(start, start + this.pageSize);
  }

  get totalPagesPendientes(): number {
    return Math.ceil(this.filteredPendientesList.length / this.pageSize) || 1;
  }

  get paginatedFirmados() {
    const start = (this.currentPageFirmados - 1) * this.pageSize;
    return this.firmadosList.slice(start, start + this.pageSize);
  }

  get totalPagesFirmados(): number {
    return Math.ceil(this.firmadosList.length / this.pageSize) || 1;
  }

  get paginatedInicio() {
    const start = (this.currentPageInicio - 1) * this.pageSize;
    return this.dashboardUrgentes.slice(start, start + this.pageSize);
  }

  get totalPagesInicio(): number {
    return Math.ceil(this.dashboardUrgentes.length / this.pageSize) || 1;
  }

  get inicioRangeText(): string {
    const total = this.dashboardUrgentes.length;
    if (total === 0) return 'No hay documentos pendientes';
    const start = (this.currentPageInicio - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPageInicio * this.pageSize, total);
    return `Mostrando ${start} a ${end} de ${total} documentos`;
  }

  get historiasRangeText(): string {
    const total = this.filteredPacientesList.length;
    if (total === 0) return 'No hay registros';
    const start = (this.currentPageHistorias - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPageHistorias * this.pageSize, total);
    return `Mostrando ${start} a ${end} de ${total} pacientes`;
  }

  get pendientesRangeText(): string {
    const total = this.filteredPendientesList.length;
    if (total === 0) return 'No hay documentos';
    const start = (this.currentPagePendientes - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPagePendientes * this.pageSize, total);
    return `Mostrando ${start} a ${end} de ${total} documentos pendientes`;
  }

  get firmadosRangeText(): string {
    const total = this.firmadosList.length;
    if (total === 0) return 'No hay registros';
    const start = (this.currentPageFirmados - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPageFirmados * this.pageSize, total);
    return `Mostrando ${start} a ${end} de ${total} registros`;
  }

  toggleFullScreen(): void {
    this.isFs = !this.isFs;
  }

  showFormError = false;

  isFormValid(): boolean {
    const d = this.newPacienteData;
    const dniValid = d.dni.trim() && d.dni.length === 8;
    const edadValid = d.edad.trim() && d.edad.length <= 2;
    return !!(
      d.nombres.trim() &&
      d.apellidos.trim() &&
      dniValid &&
      edadValid &&
      d.prioridad &&
      d.diagnostico.trim() &&
      d.resumen.trim() &&
      d.tratamiento.trim()
    );
  }

  getTodayDate(): string {
    return new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  constructor(private router: Router) {}

  t(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }

  // Guardar la vista anterior para el botón de regreso
  previousView: string = 'list';

  showPreview(patient?: any, isSigning: boolean = false): void {
    this.isSigningMode = isSigning;
    if (patient) {
      this.selectedPatient = { ...patient };
      if (!this.selectedPatient.history) {
        this.selectedPatient.history = [
          {
            fecha: this.selectedPatient.fecha || '12/05/2024',
            diagnostico: this.selectedPatient.diagnostico || 'Diagnóstico inicial registrado.',
            resumen: this.selectedPatient.resumen || 'Resumen de atención inicial.',
            tratamiento: this.selectedPatient.tratamiento || 'Tratamiento inicial prescrito.',
            prioridad: this.selectedPatient.prioridad || 'No urgente',
          },
        ];
      }

      if (this.isSigningMode) {
        // En modo firma (desde Pendientes o Dashboard), solo mostramos la versión específica
        this.selectedPatient.versions = [this.selectedPatient.fecha];
        this.activeTab = this.selectedPatient.fecha;
      } else {
        // En modo consulta (desde Historias), mostramos todo el historial
        this.selectedPatient.versions = this.selectedPatient.history.map((h: any) => h.fecha);
        this.activeTab =
          this.selectedPatient.fecha ||
          this.selectedPatient.versions[this.selectedPatient.versions.length - 1];
      }

      this.setTab(this.activeTab);
    }
    if (this.currentView !== 'preview') {
      this.previousView = this.currentView;
    }
    this.currentView = 'preview';
  }

  goBack(): void {
    if (this.selectedPatient) {
      const patientInList = this.pacientesList.find((p) => p.dni === this.selectedPatient.dni);
      if (patientInList) {
        patientInList.visitDate = new Date();
      }
    }
    this.currentView = this.previousView as any;
  }

  getFormattedVisitDate(visitDate: any): string {
    if (!visitDate) return '';
    if (typeof visitDate === 'string') return visitDate;
    if (!(visitDate instanceof Date)) return '';

    const now = new Date();
    const isToday = visitDate.toDateString() === now.toDateString();

    if (isToday) {
      const hours = visitDate.getHours().toString().padStart(2, '0');
      const minutes = visitDate.getMinutes().toString().padStart(2, '0');
      return `Hoy, ${hours}:${minutes}`;
    } else {
      const day = visitDate.getDate();
      const months = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Oct',
        'Nov',
        'Dic',
      ];
      const month = months[visitDate.getMonth()];
      const year = visitDate.getFullYear();
      return `${day} ${month} ${year}`;
    }
  }

  showList(): void {
    this.currentView = 'list';
  }

  showHistorias(): void {
    this.showFormError = false;
    this.currentView = 'historias';
  }

  showPendientes(): void {
    this.currentView = 'pendientes';
  }

  showFirmados(): void {
    this.currentView = 'firmados';
  }

  showConfig(): void {
    this.currentView = 'configuracion';
  }

  createStory(): void {
    this.isNewConsultation = false;
    this.newPacienteData = {
      nombres: '',
      apellidos: '',
      dni: '',
      edad: '',
      sexo: 'Masculino',
      prioridad: 'No urgente',
      diagnostico: '',
      resumen: '',
      tratamiento: '',
    };
    this.showFormError = false;
    this.currentView = 'create-story';
  }

  newConsultation(): void {
    const today = this.getTodayDate();
    const alreadyExists = this.selectedPatient.history?.some((h: any) => h.fecha === today);

    if (alreadyExists) {
      this.triggerAlert(
        this.currentLang === 'es' ? 'Atención' : 'Attention',
        this.currentLang === 'es' ? 
          'Este paciente ya tiene una consulta registrada el día de hoy.' : 
          'This patient already has a consultation recorded today.',
        'warning'
      );
      return;
    }

    this.isNewConsultation = true;
    const nameParts = this.selectedPatient.nombre.split(',');
    const apellidos = nameParts[0]?.trim() || '';
    const nombres = nameParts[1]?.trim() || '';

    this.newPacienteData = {
      nombres: nombres,
      apellidos: apellidos,
      dni: this.selectedPatient.dni,
      edad: this.selectedPatient.edad.replace(/\D/g, ''),
      sexo: this.selectedPatient.sexo || 'Masculino',
      prioridad: this.selectedPatient.prioridad || 'No urgente',
      diagnostico: '',
      resumen: '',
      tratamiento: '',
    };
    this.showFormError = false;
    this.currentView = 'create-story';
  }

  cancelStory(): void {
    const wasNewConsult = this.isNewConsultation;
    this.newPacienteData = {
      nombres: '',
      apellidos: '',
      dni: '',
      edad: '',
      sexo: 'Masculino',
      prioridad: 'No urgente',
      diagnostico: '',
      resumen: '',
      tratamiento: '',
    };
    this.showFormError = false;
    
    if (wasNewConsult) {
      this.currentView = 'preview';
    } else {
      this.showHistorias();
    }
  }

  saveAndPreview(): void {
    if (!this.isFormValid()) {
      this.showFormError = true;
      return;
    }

    const fullName = `${this.newPacienteData.nombres.trim()}, ${this.newPacienteData.apellidos.trim()}`;
    const firstName = this.newPacienteData.nombres.trim().split(' ')[0] || '';
    const firstLastName = this.newPacienteData.apellidos.trim().split(' ')[0] || '';
    const initials = (firstName.charAt(0) + firstLastName.charAt(0)).toUpperCase() || 'P';

    const avatarColors = ['avatarGA', 'avatarML', 'avatarRP', 'avatarSV', 'avatarPink', 'avatarIndigo', 'avatarCyan', 'avatarTeal', 'avatarOrange'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const newDate = this.getTodayDate();

    const newEntry = {
      avatarColor: randomColor,
      initials: initials,
      nombre: fullName,
      subInfo: `${this.newPacienteData.sexo}, ${this.newPacienteData.edad || '--'} años`,
      dni: this.newPacienteData.dni || '00000000',
      edad: this.newPacienteData.edad || '--',
      visitDate: new Date(),
      visitDept: 'CARDIOLOGÍA',
      servicio: 'Cardiología',
      sexo: this.newPacienteData.sexo,
      prioridad: this.newPacienteData.prioridad,
      fecha: newDate,
      diagnostico: this.newPacienteData.diagnostico,
      resumen: this.newPacienteData.resumen,
      tratamiento: this.newPacienteData.tratamiento,
      history: [] as any[],
    };

    let finalEntry: any;

    if (this.isNewConsultation) {
      const existing = this.pacientesList.find(p => p.dni === this.newPacienteData.dni);
      if (existing) {
        if (!existing.history) {
          existing.history = [{
            fecha: existing.fecha || '01/01/2024',
            diagnostico: existing.diagnostico || 'Datos previos',
            resumen: existing.resumen || 'Resumen previo',
            tratamiento: existing.tratamiento || 'Tratamiento previo',
            prioridad: existing.prioridad || 'No urgente'
          }];
        }

        const alreadyExists = existing.history.some((h: any) => h.fecha === newDate);
        if (alreadyExists) {
          this.triggerAlert(
            this.currentLang === 'es' ? 'Registro Existente' : 'Existing Record',
            this.currentLang === 'es' ? 
              'Ya existe un registro médico para este paciente con la fecha de hoy.' : 
              'A medical record already exists for this patient with today\'s date.',
            'warning'
          );
          return;
        }
        
        const newConsult = {
          fecha: newDate,
          diagnostico: newEntry.diagnostico,
          resumen: newEntry.resumen,
          tratamiento: newEntry.tratamiento,
          prioridad: newEntry.prioridad
        };
        
        existing.history.push(newConsult);
        existing.fecha = newDate;
        existing.diagnostico = newEntry.diagnostico;
        existing.resumen = newEntry.resumen;
        existing.tratamiento = newEntry.tratamiento;
        existing.prioridad = newEntry.prioridad;
        existing.visitDate = new Date();

        finalEntry = existing;
      }
    } else {
      // Validar si el DNI ya existe para otro paciente
      const dniDuplicado = this.pacientesList.find(p => p.dni === this.newPacienteData.dni);
      if (dniDuplicado) {
        this.triggerAlert(
          this.currentLang === 'es' ? 'Atención' : 'Attention',
          this.currentLang === 'es' ? 
            'Ya existe un paciente registrado con este número de DNI.' : 
            'A patient with this DNI number is already registered.',
          'warning'
        );
        return;
      }

      newEntry.history = [{
        fecha: newDate,
        diagnostico: newEntry.diagnostico,
        resumen: newEntry.resumen,
        tratamiento: newEntry.tratamiento,
        prioridad: newEntry.prioridad
      }];

      this.pacientesList.unshift(newEntry);
      finalEntry = newEntry;
    }

    // Añadir a documentos pendientes
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours24 = now.getHours();
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    const minutesStr = now.getMinutes().toString().padStart(2, '0');
    const timeFormatted = `${hours12.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;

    const nowFormat = `${day} ${month}, ${year} - ${timeFormatted}`;

    const pendingEntry = {
      ...finalEntry,
      emision: nowFormat,
      meta: 'Recién generado',
    };
    
    this.pendientesList.unshift(pendingEntry);

    this.newPacienteData = {
      nombres: '',
      apellidos: '',
      dni: '',
      edad: '',
      sexo: 'Masculino',
      prioridad: 'No urgente',
      diagnostico: '',
      resumen: '',
      tratamiento: '',
    };
    this.showFormError = false;

    if (this.isNewConsultation) {
        this.showPreview(finalEntry);
        this.previousView = 'historias';
    } else {
        this.showHistorias();
    }
  }

  showStories(): void {
    this.currentView = 'historias';
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  saveChanges(): void {
    alert(
      this.currentLang === 'es' ? '¡Cambios guardados con éxito!' : 'Changes saved successfully!',
    );
  }

  toggleLanguageDropdown(): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

  selectLanguage(langCode: string): void {
    if (langCode === 'es' || langCode === 'en') {
      this.currentLang = langCode;
    }
    this.showLanguageDropdown = false;
  }

  toggleTheme(dark: boolean): void {
    this.isDarkMode = dark;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  deleteAccount(): void {
    const msg =
      this.currentLang === 'es'
        ? '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.'
        : 'Are you sure you want to delete your account? This action cannot be undone.';

    if (confirm(msg)) {
      this.logout();
    }
  }

  validateNumber(event: KeyboardEvent): boolean {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  getPagesArray(total: number): number[] {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}
