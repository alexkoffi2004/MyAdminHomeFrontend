import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users,
  CreditCard,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Card, CardStat } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for requests
const pendingRequests = [
  {
    id: 'REQ-2023-001',
    name: 'Konan Kouadio',
    type: 'Acte de naissance',
    date: 'Il y a 2 jours',
    status: 'urgent',
  },
  {
    id: 'REQ-2023-002',
    name: 'Aya Brou',
    type: 'Certificat de nationalité',
    date: 'Il y a 1 jour',
    status: 'normal',
  },
  {
    id: 'REQ-2023-003',
    name: 'Ibrahim Cissé',
    type: 'Acte de mariage',
    date: 'Il y a 3 heures',
    status: 'normal',
  },
  {
    id: 'REQ-2023-004',
    name: 'Marie Koffi',
    type: 'Casier judiciaire',
    date: 'Il y a 5 heures',
    status: 'urgent',
  },
  {
    id: 'REQ-2023-005',
    name: 'Amadou Diallo',
    type: 'Acte de naissance',
    date: 'Il y a 7 heures',
    status: 'normal',
  }
];

const AgentDashboard = () => {
  const { user } = useAuth();
  const [statsLoaded, setStatsLoaded] = useState(false);
  
  const [stats, setStats] = useState({
    pendingRequests: 0,
    processingRequests: 0,
    completedToday: 0,
    rejectedToday: 0,
  });
  
  // Load stats
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats({
        pendingRequests: 12,
        processingRequests: 5,
        completedToday: 8,
        rejectedToday: 2,
      });
      setStatsLoaded(true);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tableau de bord</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Bienvenue, {user?.firstName} {user?.lastName} | {user?.commune}
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardStat
          title="Demandes en attente"
          value={statsLoaded ? stats.pendingRequests : '-'}
          icon={<Clock size={20} />}
          trend={{ value: 4, isPositive: false }}
          className="border-l-4 border-l-warning-500"
        />
        <CardStat
          title="En cours de traitement"
          value={statsLoaded ? stats.processingRequests : '-'}
          icon={<FileText size={20} />}
          trend={{ value: 2, isPositive: true }}
          className="border-l-4 border-l-primary-500"
        />
        <CardStat
          title="Validées aujourd'hui"
          value={statsLoaded ? stats.completedToday : '-'}
          icon={<CheckCircle size={20} />}
          trend={{ value: 5, isPositive: true }}
          className="border-l-4 border-l-success-500"
        />
        <CardStat
          title="Rejetées aujourd'hui"
          value={statsLoaded ? stats.rejectedToday : '-'}
          icon={<XCircle size={20} />}
          trend={{ value: 1, isPositive: false }}
          className="border-l-4 border-l-error-500"
        />
      </div>
      
      {/* Main Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending Requests */}
        <Card 
          title="Demandes à traiter" 
          subtitle="Requêtes en attente de traitement"
          headerAction={
            <Link to="/agent/requests">
              <Button variant="ghost\" size="sm">
                Voir tout
              </Button>
            </Link>
          }
          className="lg:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Demandeur</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Soumis</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {pendingRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white">
                      {request.id}
                      {request.status === 'urgent' && (
                        <span className="ml-2 inline-flex rounded-full bg-error-100 px-2 text-xs font-semibold leading-5 text-error-800 dark:bg-error-900/30 dark:text-error-400">
                          Urgent
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-900 dark:text-white">{request.name}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">{request.type}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">{request.date}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <Link to={`/agent/process/${request.id}`}>
                        <Button size="sm">
                          Traiter
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Alerts */}
        <Card title="Alertes" className="flex flex-col">
          <div className="flex-1">
            <div className="space-y-4">
              <div className="rounded-md bg-warning-50 p-4 dark:bg-warning-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-warning-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-warning-800 dark:text-warning-400">Demandes en attente</h3>
                    <div className="mt-2 text-sm text-warning-700 dark:text-warning-300">
                      <p>3 demandes sont en attente depuis plus de 48h</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-error-50 p-4 dark:bg-error-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-error-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-error-800 dark:text-error-400">Demandes urgentes</h3>
                    <div className="mt-2 text-sm text-error-700 dark:text-error-300">
                      <p>2 demandes marquées comme urgentes à traiter</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-primary-50 p-4 dark:bg-primary-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-primary-800 dark:text-primary-400">Rappel</h3>
                    <div className="mt-2 text-sm text-primary-700 dark:text-primary-300">
                      <p>Réunion d'équipe prévue demain à 09:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
            <Link to="/agent/requests" className="flex items-center justify-between text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              <span>Voir toutes les demandes</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Performance */}
      <Card 
        title="Performance"
        subtitle="Vos statistiques de traitement des derniers 7 jours"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Demandes traitées</span>
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">32</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Temps moyen de traitement</span>
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">1.8j</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Taux d'approbation</span>
              <span className="text-2xl font-bold text-success-500 dark:text-success-400">93%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgentDashboard;