import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Users, 
  FileText, 
  CreditCard, 
  User,
  ArrowUp,
  ArrowDown,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  Settings,
  FileCheck,
} from 'lucide-react';
import { Card, CardStat } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for statistics
const adminStats = {
  totalUsers: 1248,
  totalAgents: 37,
  totalRequests: 5639,
  totalDocuments: 4521,
  revenue: 15324500,
  pendingRequests: 124,
  processingRequests: 85,
  completedRequests: 4935,
  rejectedRequests: 495,
};

// Mock data for recent payments
const recentPayments = [
  {
    id: 'PAY-2023-001',
    user: 'Konan Kouadio',
    amount: 3000,
    date: '21/04/2023',
    status: 'success',
  },
  {
    id: 'PAY-2023-002',
    user: 'Aya Brou',
    amount: 5000,
    date: '21/04/2023',
    status: 'success',
  },
  {
    id: 'PAY-2023-003',
    user: 'Ibrahim Cissé',
    amount: 1500,
    date: '21/04/2023',
    status: 'pending',
  },
  {
    id: 'PAY-2023-004',
    user: 'Marie Koffi',
    amount: 3000,
    date: '20/04/2023',
    status: 'success',
  },
  {
    id: 'PAY-2023-005',
    user: 'Amadou Diallo',
    amount: 1000,
    date: '20/04/2023',
    status: 'success',
  },
];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-CI', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [statsLoaded, setStatsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStatsLoaded(true);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tableau de bord administrateur</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Vue d'ensemble du système et statistiques clés
        </p>
      </div>
      
      {/* Stats row 1 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <CardStat
          title="Total des utilisateurs"
          value={statsLoaded ? adminStats.totalUsers.toLocaleString() : '-'}
          icon={<Users size={20} />}
          trend={{ value: 8, isPositive: true }}
        />
        <CardStat
          title="Total des agents"
          value={statsLoaded ? adminStats.totalAgents.toLocaleString() : '-'}
          icon={<User size={20} />}
          trend={{ value: 2, isPositive: true }}
        />
        <CardStat
          title="Total des demandes"
          value={statsLoaded ? adminStats.totalRequests.toLocaleString() : '-'}
          icon={<FileText size={20} />}
          trend={{ value: 12, isPositive: true }}
        />
        <CardStat
          title="Revenus totaux"
          value={statsLoaded ? formatCurrency(adminStats.revenue) : '-'}
          icon={<CreditCard size={20} />}
          trend={{ value: 14, isPositive: true }}
        />
      </div>
      
      {/* Status indicators */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-warning-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">En attente</p>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {statsLoaded ? adminStats.pendingRequests : '-'}
              </p>
            </div>
            <div className="rounded-full bg-warning-100 p-2 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400">
              <Clock size={20} />
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">En traitement</p>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {statsLoaded ? adminStats.processingRequests : '-'}
              </p>
            </div>
            <div className="rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              <FileCheck size={20} />
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-success-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Approuvées</p>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {statsLoaded ? adminStats.completedRequests : '-'}
              </p>
            </div>
            <div className="rounded-full bg-success-100 p-2 text-success-600 dark:bg-success-900/30 dark:text-success-400">
              <CheckCircle size={20} />
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-error-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Rejetées</p>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {statsLoaded ? adminStats.rejectedRequests : '-'}
              </p>
            </div>
            <div className="rounded-full bg-error-100 p-2 text-error-600 dark:bg-error-900/30 dark:text-error-400">
              <XCircle size={20} />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart placeholder */}
        <Card 
          title="Vue d'ensemble des activités" 
          subtitle="Derniers 30 jours"
          className="lg:col-span-2"
        >
          <div className="h-80 w-full rounded-md bg-neutral-100 dark:bg-neutral-800">
            <div className="flex h-full flex-col items-center justify-center">
              <BarChart size={48} className="mb-4 text-neutral-400" />
              <p className="text-center text-neutral-500 dark:text-neutral-400">
                Graphique des activités <br />
                (Visualisations à implémenter)
              </p>
            </div>
          </div>
        </Card>
        
        {/* Quick Actions */}
        <Card title="Actions rapides">
          <div className="grid gap-3">
            <Link 
              to="/admin/users"
              className="flex items-center gap-3 rounded-md border border-neutral-200 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-900/50 dark:hover:bg-primary-900/10"
            >
              <div className="rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <Users size={18} />
              </div>
              <span className="font-medium text-neutral-900 dark:text-white">Gérer les utilisateurs</span>
            </Link>
            
            <Link 
              to="/admin/document-types"
              className="flex items-center gap-3 rounded-md border border-neutral-200 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-900/50 dark:hover:bg-primary-900/10"
            >
              <div className="rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <FileText size={18} />
              </div>
              <span className="font-medium text-neutral-900 dark:text-white">Types de documents</span>
            </Link>
            
            <Link 
              to="/admin/payments"
              className="flex items-center gap-3 rounded-md border border-neutral-200 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-900/50 dark:hover:bg-primary-900/10"
            >
              <div className="rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <CreditCard size={18} />
              </div>
              <span className="font-medium text-neutral-900 dark:text-white">Suivi des paiements</span>
            </Link>
            
            <Link 
              to="/admin/statistics"
              className="flex items-center gap-3 rounded-md border border-neutral-200 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-900/50 dark:hover:bg-primary-900/10"
            >
              <div className="rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <BarChart size={18} />
              </div>
              <span className="font-medium text-neutral-900 dark:text-white">Voir les statistiques</span>
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Recent Payments */}
      <Card
        title="Paiements récents"
        headerAction={
          <Link to="/admin/payments\" className="text-sm font-medium text-primary-500 hover:text-primary-400 dark:hover:text-primary-300">
            Voir tout
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Utilisateur</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Montant</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {recentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 dark:text-white">{payment.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 dark:text-white">{payment.user}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 dark:text-white">{formatCurrency(payment.amount)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">{payment.date}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {payment.status === 'success' ? (
                      <span className="inline-flex rounded-full bg-success-100 px-2 py-1 text-xs font-medium text-success-800 dark:bg-success-900/30 dark:text-success-400">
                        Réussi
                      </span>
                    ) : payment.status === 'pending' ? (
                      <span className="inline-flex rounded-full bg-warning-100 px-2 py-1 text-xs font-medium text-warning-800 dark:bg-warning-900/30 dark:text-warning-400">
                        En attente
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-error-100 px-2 py-1 text-xs font-medium text-error-800 dark:bg-error-900/30 dark:text-error-400">
                        Échoué
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* System Status */}
      <Card title="État du système">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Base de données</span>
              <span className="inline-flex rounded-full bg-success-100 px-2 py-0.5 text-xs font-medium text-success-800 dark:bg-success-900/30 dark:text-success-400">
                En ligne
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-success-500" />
              <span className="text-sm text-success-700 dark:text-success-400">Fonctionnement normal</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">API Paiements</span>
              <span className="inline-flex rounded-full bg-success-100 px-2 py-0.5 text-xs font-medium text-success-800 dark:bg-success-900/30 dark:text-success-400">
                En ligne
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-success-500" />
              <span className="text-sm text-success-700 dark:text-success-400">Fonctionnement normal</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Service de notification</span>
              <span className="inline-flex rounded-full bg-warning-100 px-2 py-0.5 text-xs font-medium text-warning-800 dark:bg-warning-900/30 dark:text-warning-400">
                Dégradé
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-warning-500" />
              <span className="text-sm text-warning-700 dark:text-warning-400">Ralentissements constatés</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;