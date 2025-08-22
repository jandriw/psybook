// src/routes/booking/[psychologist]/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Appointment, TimeBlock, Service, Psychologist } from '$lib/types/calendar.ts';

export const load: PageServerLoad = async ({ params }) => {
  const psychologistSlug = params.psychologist;
  
  // ✅ FUNCIONES AUXILIARES (las mismas que antes)
  function getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  function parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  }

  function formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  // ✅ FUNCIÓN PARA GENERAR CITAS PÚBLICAS (CON TIPOS CORRECTOS)
  function generatePublicAppointments(): Appointment[] {
    const appointments: Appointment[] = [];
    const today = new Date();
    const currentWeekStart = getStartOfWeek(today);
    
    const services = [
      { name: 'Terapia individual', duration: 50 },
      { name: 'Primera consulta', duration: 45 },
      { name: 'Terapia de pareja', duration: 60 },
      { name: 'Seguimiento', duration: 30 },
      { name: 'Sesión intensiva', duration: 90 }
    ];

    // Generar para las próximas 4 semanas
    for (let weekOffset = 0; weekOffset <= 3; weekOffset++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() + (weekOffset * 7));

      const appointmentsThisWeek = weekOffset <= 1 ? 
        Math.floor(Math.random() * 4) + 12 :
        Math.floor(Math.random() * 6) + 8;
      
      for (let i = 0; i < appointmentsThisWeek; i++) {
        const dayOffset = Math.random() < 0.9 ? 
          Math.floor(Math.random() * 5) :
          Math.floor(Math.random() * 7);

        const appointmentDate = new Date(weekStart);
        appointmentDate.setDate(appointmentDate.getDate() + dayOffset);
        
        const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
        const afternoonSlots = ['15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];
        
        const timeSlots = Math.random() < 0.6 ? afternoonSlots : morningSlots;
        const startTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        
        const service = services[Math.floor(Math.random() * services.length)];
        const startMinutes = parseTime(startTime);
        const endTime = formatTime(new Date(startMinutes + service.duration * 60000));

        appointments.push({
          id: `public-${weekOffset}-${i}`,
          clientName: 'Reservado',
          service: 'Sesión',
          startTime,
          endTime,
          date: appointmentDate.toISOString().split('T')[0],
          status: 'confirmed' as const, // ✅ Tipo específico
          price: 0,
          hasVideo: false
        });
      }
    }

    return appointments;
  }

  // ✅ FUNCIÓN PARA GENERAR BLOQUEOS (CON TIPOS CORRECTOS)
  function generatePublicBlocks(): TimeBlock[] {
    const blocks: TimeBlock[] = [];
    const currentWeekStart = getStartOfWeek(new Date());

    const blockTemplates = [
      { 
        title: 'No disponible', 
        timeSlots: ['13:00-14:00'],
        frequency: 0.8,
        type: 'blocked' as const // ✅ Tipo específico
      },
      { 
        title: 'No disponible', 
        timeSlots: ['12:00-13:00', '18:00-19:00'],
        frequency: 0.3,
        type: 'blocked' as const
      },
      { 
        title: 'No disponible', 
        timeSlots: ['08:00-09:00', '19:00-20:00'],
        frequency: 0.2,
        type: 'personal' as const // ✅ Tipo específico
      }
    ];

    for (let weekOffset = 0; weekOffset <= 3; weekOffset++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() + (weekOffset * 7));

      for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
        const blockDate = new Date(weekStart);
        blockDate.setDate(blockDate.getDate() + dayOffset);

        blockTemplates.forEach((template, templateIndex) => {
          if (Math.random() < template.frequency) {
            const timeSlot = template.timeSlots[Math.floor(Math.random() * template.timeSlots.length)];
            const [startTime, endTime] = timeSlot.split('-');

            blocks.push({
              id: `block-${weekOffset}-${dayOffset}-${templateIndex}`,
              title: template.title,
              startTime,
              endTime,
              date: blockDate.toISOString().split('T')[0],
              type: template.type,
              reason: ''
            });
          }
        });
      }
    }

    return blocks;
  }

  // ✅ DATOS FIJOS CON TIPOS CORRECTOS
  const today = new Date();
  const currentWeek = getStartOfWeek(today);
  
  const thisWeekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeek);
    date.setDate(date.getDate() + i);
    return date;
  });

  const fixedAppointments: Appointment[] = [
    {
      id: 'fixed-1',
      clientName: 'Reservado',
      service: 'Sesión',
      startTime: '09:00',
      endTime: '09:50',
      date: thisWeekDates[0].toISOString().split('T')[0],
      status: 'confirmed', // ✅ Tipo correcto
      price: 0,
      hasVideo: false
    },
    {
      id: 'fixed-2',
      clientName: 'Reservado',
      service: 'Sesión',
      startTime: '10:30',
      endTime: '11:15',
      date: thisWeekDates[0].toISOString().split('T')[0],
      status: 'confirmed',
      price: 0,
      hasVideo: false
    },
    {
      id: 'fixed-3',
      clientName: 'Reservado',
      service: 'Sesión',
      startTime: '16:00',
      endTime: '17:00',
      date: thisWeekDates[1].toISOString().split('T')[0],
      status: 'confirmed',
      price: 0,
      hasVideo: false
    },
    {
      id: 'fixed-4',
      clientName: 'Reservado',
      service: 'Sesión',
      startTime: '15:30',
      endTime: '16:20',
      date: thisWeekDates[3].toISOString().split('T')[0],
      status: 'confirmed',
      price: 0,
      hasVideo: false
    },
    {
      id: 'fixed-5',
      clientName: 'Reservado',
      service: 'Sesión',
      startTime: '11:00',
      endTime: '12:00',
      date: thisWeekDates[4].toISOString().split('T')[0],
      status: 'confirmed',
      price: 0,
      hasVideo: false
    }
  ];

  const fixedBlocks: TimeBlock[] = [
    {
      id: 'lunch-1',
      title: 'No disponible',
      startTime: '13:00',
      endTime: '14:00',
      date: thisWeekDates[1].toISOString().split('T')[0],
      type: 'blocked', // ✅ Tipo correcto
      reason: ''
    },
    {
      id: 'lunch-2',
      title: 'No disponible',
      startTime: '13:00',
      endTime: '14:00',
      date: thisWeekDates[3].toISOString().split('T')[0],
      type: 'blocked',
      reason: ''
    },
    {
      id: 'admin-1',
      title: 'No disponible',
      startTime: '18:00',
      endTime: '19:00',
      date: thisWeekDates[2].toISOString().split('T')[0],
      type: 'blocked',
      reason: ''
    }
  ];

  // ✅ GENERAR Y COMBINAR DATOS
  const generatedAppointments = generatePublicAppointments();
  const generatedBlocks = generatePublicBlocks();
  
  const allAppointments = [...fixedAppointments, ...generatedAppointments];
  const allBlocks = [...fixedBlocks, ...generatedBlocks];

  // ✅ RESTO DE DATOS (psicólogo, servicios, etc.)
  const psychologistData: Psychologist = {
    id: 'dra-carmen-rodriguez',
    name: 'Dra. Carmen Rodríguez',
    slug: psychologistSlug,
    title: 'Psicóloga Sanitaria',
    specialization: 'Ansiedad y Estrés Laboral',
    collegiateNumber: 'M-15847',
    experience: '8 años ayudando a profesionales',
    approach: 'Terapia Cognitivo-Conductual práctica y orientada a resultados',
    languages: ['Español', 'Inglés'],
    avatar: '/images/dra-carmen.jpg',
    description: `Soy Carmen Rodríguez, psicóloga sanitaria especializada en el tratamiento de la ansiedad y el estrés laboral...`,
    schedule: 'Lun-Vie 9:00-18:00',
    location: 'Madrid, España (Online)',
    videoPreference: 'Zoom'
  };

  const services: Service[] = [
    {
      id: 'primera-consulta',
      name: 'Primera Consulta',
      description: 'Evaluación inicial y plan personalizado de tratamiento',
      duration: 45,
      price: 45,
      active: true
    },
    {
      id: 'terapia-individual',
      name: 'Terapia Individual',
      description: 'Sesión estándar personalizada para trabajar objetivos específicos',
      duration: 50,
      price: 60,
      active: true
    },
    {
      id: 'terapia-pareja',
      name: 'Terapia de Pareja',
      description: 'Sesión conjunta para mejorar la comunicación y resolver conflictos',
      duration: 60,
      price: 75,
      active: true
    },
    {
      id: 'seguimiento',
      name: 'Sesión de Seguimiento',
      description: 'Revisión de progreso y mantenimiento de objetivos',
      duration: 30,
      price: 50,
      active: true
    }
  ];

  // ✅ RESTO DE DATOS HARDCODEADOS...
  const availability = {
    monday: { active: true, startTime: '09:00', endTime: '18:00' },
    tuesday: { active: true, startTime: '09:00', endTime: '18:00' },
    wednesday: { active: true, startTime: '09:00', endTime: '18:00' },
    thursday: { active: true, startTime: '09:00', endTime: '18:00' },
    friday: { active: true, startTime: '09:00', endTime: '18:00' },
    saturday: { active: false, startTime: '10:00', endTime: '14:00' },
    sunday: { active: false, startTime: '10:00', endTime: '14:00' }
  };

  const policies = {
    cancellation: {
      freeUntilHours: 24,
      lateRefundPercentage: 50,
      noShowRefund: 0
    },
    reschedule: {
      allowedUntilHours: 24,
      maxReschedules: 2
    },
    payment: {
      required: true,
      methods: ['card'],
      currency: 'EUR'
    }
  };

  const testimonials = [
    {
      id: '1',
      name: 'María L.',
      rating: 5,
      comment: 'Carmen me ayudó muchísimo con mi ansiedad laboral. Sus técnicas son muy prácticas y efectivas.',
      date: '2024-12-15',
      verified: true,
      service: 'Terapia individual'
    },
    // ... resto de testimonios
  ];

  return {
    psychologist: psychologistData,
    services,
    appointments: allAppointments,
    blocks: allBlocks,
    availability,
    policies,
    testimonials
  };
};