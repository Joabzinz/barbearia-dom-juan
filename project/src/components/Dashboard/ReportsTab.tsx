import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  DollarSign,
  Users,
  Scissors,
  Download,
  Filter,
  Eye,
  PieChart,
  Activity
} from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 3200, appointments: 45, clients: 38 },
  { month: 'Fev', revenue: 3800, appointments: 52, clients: 42 },
  { month: 'Mar', revenue: 4100, appointments: 58, clients: 48 },
  { month: 'Abr', revenue: 3900, appointments: 55, clients: 45 },
  { month: 'Mai', revenue: 4500, appointments: 62, clients: 52 },
  { month: 'Jun', revenue: 4250, appointments: 59, clients: 49 }
];

const serviceData = [
  { service: 'Corte + Barba', count: 145, revenue: 7250, percentage: 45 },
  { service: 'Corte Simples', count: 98, revenue: 3430, percentage: 30 },
  { service: 'Barba', count: 67, revenue: 1675, percentage: 20 },
  { service: 'Sobrancelha', count: 23, revenue: 345, percentage: 5 }
];

const topClients = [
  { name: 'Carlos Silva', visits: 12, revenue: 600, lastVisit: '2024-01-10' },
  { name: 'João Santos', visits: 10, revenue: 500, lastVisit: '2024-01-08' },
  { name: 'Pedro Lima', visits: 9, revenue: 450, lastVisit: '2024-01-12' },
  { name: 'Rafael Costa', visits: 8, revenue: 400, lastVisit: '2024-01-05' },
  { name: 'Lucas Oliveira', visits: 7, revenue: 350, lastVisit: '2024-01-15' }
];

export const ReportsTab: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const totalRevenue = monthlyData.reduce((acc, month) => acc + month.revenue, 0);
  const totalAppointments = monthlyData.reduce((acc, month) => acc + month.appointments, 0);
  const averageTicket = totalRevenue / totalAppointments;
  const growthRate = ((monthlyData[5].revenue - monthlyData[0].revenue) / monthlyData[0].revenue) * 100;

  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Relatórios</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Análise completa do desempenho da sua barbearia
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1month">Último mês</option>
            <option value="3months">Últimos 3 meses</option>
            <option value="6months">Últimos 6 meses</option>
            <option value="1year">Último ano</option>
          </select>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                R$ {totalRevenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +{growthRate.toFixed(1)}% vs período anterior
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Agendamentos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAppointments}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                {(totalAppointments / 6).toFixed(0)} por mês
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ticket Médio</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                R$ {averageTicket.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                Por atendimento
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Clientes Únicos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">142</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                +8 este mês
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
              <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evolução da Receita
            </h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="revenue">Receita</option>
                <option value="appointments">Agendamentos</option>
                <option value="clients">Clientes</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((month, index) => {
              const value = selectedMetric === 'revenue' ? month.revenue : 
                           selectedMetric === 'appointments' ? month.appointments : month.clients;
              const maxValue = selectedMetric === 'revenue' ? maxRevenue : 
                              selectedMetric === 'appointments' ? 62 : 52;
              const percentage = (value / maxValue) * 100;
              
              return (
                <div key={month.month} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">
                    {month.month}
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-blue-600 dark:bg-blue-400 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-16 text-right">
                    {selectedMetric === 'revenue' ? `R$ ${value.toLocaleString('pt-BR')}` : value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance por Serviço
            </h3>
            <PieChart className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {serviceData.map((service, index) => (
              <div key={service.service} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {service.service}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {service.percentage}%
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        index === 0 ? 'bg-blue-600' :
                        index === 1 ? 'bg-green-600' :
                        index === 2 ? 'bg-yellow-600' : 'bg-purple-600'
                      }`}
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      R$ {service.revenue.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {service.count} serviços
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top 5 Clientes
            </h3>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Ver todos
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div key={client.name} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Última visita: {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    R$ {client.revenue.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {client.visits} visitas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-2">Relatório Mensal</h4>
              <p className="text-sm opacity-90 mb-4">
                Gere um relatório completo do mês atual
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Gerar Relatório
              </button>
            </div>
            <BarChart3 className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-2">Análise de Clientes</h4>
              <p className="text-sm opacity-90 mb-4">
                Veja insights sobre seus clientes
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Ver Análise
              </button>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-2">Previsão de Receita</h4>
              <p className="text-sm opacity-90 mb-4">
                Projeção baseada no histórico
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Ver Previsão
              </button>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};