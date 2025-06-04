import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowUpRight, 
  BarChart, 
  Calendar, 
  User,
  Plus
} from 'lucide-react';
import { Card, CardStat } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import Badge from '../../components/UI/Badge';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Interfaces
interface RequestStatus {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  date: Date;
  lastUpdate?: Date;
}

// Mock data
const mockRequests: RequestStatus[] = [
  {
    id: 'REQ-2023-001',
    title: 'Acte de naissance',
    type: 'birth_certificate',
    status: 'approved',
    date: new Date(2023, 4, 15),
    lastUpdate: new Date(2023, 4, 17)
  },
  {
    id: 'REQ-2023-002',
    title: 'Certificat de nationalité',
    type: 'nationality_certificate',
    status: 'pending',
    date: new Date(2023, 5, 20)
  },
  {
    id: 'REQ-2023-003',
    title: 'Acte de mariage',
    type: 'marriage_certificate',
    status: 'processing',
    date: new Date(2023, 5, 25),
    lastUpdate: new Date(2023, 5, 26)
  },
  {
    id: 'REQ-2023-004',
    title: 'Casier judiciaire',
    type: 'criminal_record',
    status: 'rejected',
    date: new Date(2023, 5, 10),
    lastUpdate: new Date(2023, 5, 12)
  }
];

// Status badge helper
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'approved':
      return <Badge variant="success">Approuvée</Badge>;
    case 'pending':
      return <Badge variant="warning">En attente</Badge>;
    case 'processing':
      return <Badge variant="primary">En cours</Badge>;
    case 'rejected':
      return <Badge variant="danger">Rejetée</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [latestRequests, setLatestRequests] = useState<RequestStatus[]>([]);
  const [statsLoaded, setStatsLoaded] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  });
  
  // Load mock data
  useEffect(() => {
    setLatestRequests(mockRequests);
    
    // Calculate stats
    const total = mockRequests.length;
    const pending = mockRequests.filter(r => r.status === 'pending' || r.status === 'processing').length;
    const approved = mockRequests.filter(r => r.status === 'approved').length;
    const rejected = mockRequests.filter(r => r.status === 'rejected').length;
    
    setStats({
      totalRequests: total,
      pendingRequests: pending,
      approvedRequests: approved,
      rejectedRequests: rejected
    });
    
    // Simulate loading
    setTimeout(() => {
      setStatsLoaded(true);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tableau de bord</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Bienvenue, {user?.firstName} {user?.lastName}
          </p>
        </div>
        <Link to="/citizen/new-request">
          <Button icon={<Plus size={18} />}>
            Nouvelle demande
          </Button>
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <CardStat
          title="Demandes totales"
          value={statsLoaded ? stats.totalRequests : '-'}
          icon={<FileText size={20} />}
          trend={{ value: 12, isPositive: true }}
        />
        <CardStat
          title="En attente"
          value={statsLoaded ? stats.pendingRequests : '-'}
          icon={<Clock size={20} />}
          trend={{ value: 4, isPositive: false }}
        />
        <CardStat
          title="Approuvées"
          value={statsLoaded ? stats.approvedRequests : '-'}
          icon={<CheckCircle size={20} />}
          trend={{ value: 8, isPositive: true }}
        />
        <CardStat
          title="Rejetées"
          value={statsLoaded ? stats.rejectedRequests : '-'}
          icon={<XCircle size={20} />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      {/* Latest Requests */}
      <Card 
        title="Demandes récentes" 
        headerAction={
          <Link to="/citizen/requests\" className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
            Voir tout
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Référence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-transparent">
              {latestRequests.map((request) => (
                <tr key={request.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 dark:text-white">
                    {request.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 dark:text-white">
                    {request.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {request.lastUpdate ? 
                      `Mis à jour ${formatDistanceToNow(request.lastUpdate, { addSuffix: true, locale: fr })}` : 
                      formatDistanceToNow(request.date, { addSuffix: true, locale: fr })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <Link 
                      to={`/citizen/requests/${request.id}`}
                      className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Useful Actions */}
      <Card title="Actions rapides">
        <div className="grid gap-4 md:grid-cols-3">
          <Link 
            to="/citizen/new-request"
            className="flex flex-col items-center rounded-lg border border-neutral-200 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-900 dark:hover:bg-primary-900/10"
          >
            <div className="rounded-full bg-primary-100 p-3 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400">
              <FileText size={24} />
            </div>
            <h3 className="mt-3 font-medium text-neutral-900 dark:text-white">Nouvelle demande</h3>
            <p className="mt-1 text-center text-sm text-neutral-600 dark:text-neutral-400">Créer une nouvelle demande de document</p>
          </Link>
          
          <Link 
            to="/citizen/requests"
            className="flex flex-col items-center rounded-lg border border-neutral-200 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-900 dark:hover:bg-primary-900/10"
          >
            <div className="rounded-full bg-primary-100 p-3 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400">
              <Clock size={24} />
            </div>
            <h3 className="mt-3 font-medium text-neutral-900 dark:text-white">Suivi de demandes</h3>
            <p className="mt-1 text-center text-sm text-neutral-600 dark:text-neutral-400">Consultez l'état de vos demandes en cours</p>
          </Link>
          
          <Link 
            to="/citizen/profile"
            className="flex flex-col items-center rounded-lg border border-neutral-200 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-neutral-700 dark:hover:border-primary-900 dark:hover:bg-primary-900/10"
          >
            <div className="rounded-full bg-primary-100 p-3 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400">
              <User size={24} />
            </div>
            <h3 className="mt-3 font-medium text-neutral-900 dark:text-white">Mon profil</h3>
            <p className="mt-1 text-center text-sm text-neutral-600 dark:text-neutral-400">Gérer vos informations personnelles</p>
          </Link>
        </div>
      </Card>

      {/* Helpful Resources */}
      <Card title="Ressources utiles">
        <div className="space-y-3">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 hover:border-primary-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-primary-900/50 dark:hover:bg-neutral-800"
          >
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-primary-100 p-2 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white">Guide des procédures administratives</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Tout savoir sur les procédures et documents nécessaires</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-neutral-500 dark:text-neutral-400" />
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 hover:border-primary-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-primary-900/50 dark:hover:bg-neutral-800"
          >
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-primary-100 p-2 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400">
                <AlertCircle size={18} />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white">Questions fréquentes</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Réponses aux questions les plus courantes</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-neutral-500 dark:text-neutral-400" />
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 hover:border-primary-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-primary-900/50 dark:hover:bg-neutral-800"
          >
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-primary-100 p-2 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white">Délais de traitement</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Informations sur les délais pour chaque type de document</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-neutral-500 dark:text-neutral-400" />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default CitizenDashboard;