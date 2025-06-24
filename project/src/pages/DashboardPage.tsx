import React, { useState } from 'react';
import { Sidebar } from '../components/Layout/Sidebar';
import { Header } from '../components/Layout/Header';
import { DashboardOverview } from '../components/Dashboard/DashboardOverview';
import { AppointmentsTab } from '../components/Dashboard/AppointmentsTab';
import { FinancesTab } from '../components/Dashboard/FinancesTab';
import { ReportsTab } from '../components/Dashboard/ReportsTab';
import { ServicesTab } from '../components/Dashboard/ServicesTab';

const renderTabContent = (activeTab: string) => {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardOverview />;
    case 'appointments':
      return <AppointmentsTab />;
    case 'finances':
      return <FinancesTab />;
    case 'reports':
      return <ReportsTab />;
    case 'services':
      return <ServicesTab />;
    case 'clients':
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Clientes</h2>
          <p className="text-gray-600 dark:text-gray-400">Módulo de clientes em desenvolvimento...</p>
        </div>
      );
    case 'profile':
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Perfil</h2>
          <p className="text-gray-600 dark:text-gray-400">Módulo de perfil em desenvolvimento...</p>
        </div>
      );
    case 'settings':
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Configurações</h2>
          <p className="text-gray-600 dark:text-gray-400">Módulo de configurações em desenvolvimento...</p>
        </div>
      );
    default:
      return <DashboardOverview />;
  }
};

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderTabContent(activeTab)}
        </main>
      </div>
    </div>
  );
};