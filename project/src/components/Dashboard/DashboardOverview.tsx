import React from 'react';
import { 
  DollarSign, 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock,
  Scissors,
  Star,
  AlertCircle
} from 'lucide-react';

const statsCards = [
  {
    title: 'Receita do Mês',
    value: 'R$ 4.250,00',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'bg-green-500'
  },
  {
    title: 'Agendamentos Hoje',
    value: '8',
    change: '+2 vs ontem',
    changeType: 'positive' as const,
    icon: Calendar,
    color: 'bg-blue-500'
  },
  {
    title: 'Clientes Ativos',
    value: '142',
    change: '+5 este mês',
    changeType: 'positive' as const,
    icon: Users,
    color: 'bg-purple-500'
  },
  {
    title: 'Avaliação Média',
    value: '4.8',
    change: '+0.2 este mês',
    changeType: 'positive' as const,
    icon: Star,
    color: 'bg-yellow-500'
  }
];

const recentAppointments = [
  {
    id: 1,
    client: 'Carlos Silva',
    service: 'Corte + Barba',
    time: '09:00',
    status: 'confirmed',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: 2,
    client: 'João Santos',
    service: 'Corte Simples',
    time: '10:30',
    status: 'waiting',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: 3,
    client: 'Pedro Lima',
    service: 'Barba + Bigode',
    time: '14:00',
    status: 'confirmed',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: 4,
    client: 'Rafael Costa',
    service: 'Corte + Barba',
    time: '16:30',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'waiting': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed': return 'Confirmado';
    case 'waiting': return 'Aguardando';
    case 'pending': return 'Pendente';
    default: return 'Desconhecido';
  }
};

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visão geral do seu negócio hoje, {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agendamentos de Hoje */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agendamentos de Hoje
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                Ver todos
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                  <img
                    src={appointment.avatar}
                    alt={appointment.client}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {appointment.client}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {appointment.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.service}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo Rápido */}
        <div className="space-y-6">
          {/* Próximo Agendamento */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Próximo Agendamento
            </h3>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Carlos Silva</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Corte + Barba • 09:00</p>
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Alertas
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    Estoque baixo
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    Pomada para cabelo
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    3 agendamentos pendentes
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Aguardando confirmação
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance do Mês
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Receita</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">+12.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Novos clientes</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">+8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Satisfação</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};