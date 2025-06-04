import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter, ArrowRight } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import RequestStatusBadge from '../../components/UI/RequestStatusBadge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Mock data for requests
const mockRequests = [
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
  },
  {
    id: 'REQ-2023-005',
    title: 'Acte de naissance',
    type: 'birth_certificate',
    status: 'delivered',
    date: new Date(2023, 4, 1),
    lastUpdate: new Date(2023, 4, 5)
  }
];

// Filter options
const statusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'pending', label: 'En attente' },
  { value: 'processing', label: 'En traitement' },
  { value: 'approved', label: 'Approuvée' },
  { value: 'rejected', label: 'Rejetée' },
  { value: 'delivered', label: 'Délivrée' }
];

const documentTypes = [
  { value: 'all', label: 'Tous les types' },
  { value: 'birth_certificate', label: 'Acte de naissance' },
  { value: 'marriage_certificate', label: 'Acte de mariage' },
  { value: 'death_certificate', label: 'Acte de décès' },
  { value: 'nationality_certificate', label: 'Certificat de nationalité' },
  { value: 'residence_certificate', label: 'Certificat de résidence' },
  { value: 'criminal_record', label: 'Casier judiciaire' }
];

const RequestTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Filter requests based on search term and filters
  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Suivi des demandes</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Consultez et suivez l'état de vos demandes
          </p>
        </div>
        <Link to="/citizen/new-request">
          <Button icon={<FileText size={18} />}>
            Nouvelle demande
          </Button>
        </Link>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Rechercher une demande..."
            icon={<Search size={18} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            icon={<Filter size={18} />}
          />
          
          <Select
            options={documentTypes}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            icon={<FileText size={18} />}
          />
        </div>
      </Card>
      
      {/* Requests List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/50">
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
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-900 dark:text-white">
                    {request.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900 dark:text-white">
                    {request.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {request.lastUpdate ? 
                      `Mis à jour ${format(request.lastUpdate, 'dd/MM/yyyy', { locale: fr })}` : 
                      format(request.date, 'dd/MM/yyyy', { locale: fr })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <RequestStatusBadge status={request.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <Link 
                      to={`/citizen/requests/${request.id}`}
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      <span>Détails</span>
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRequests.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Aucune demande ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RequestTracking;