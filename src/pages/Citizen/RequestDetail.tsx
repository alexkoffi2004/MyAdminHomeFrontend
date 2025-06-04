import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  Calendar,
  MapPin,
  User,
  Phone,
  CreditCard,
  Download,
  ArrowLeft
} from 'lucide-react';
import { Card } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import RequestStatusBadge from '../../components/UI/RequestStatusBadge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Mock request data
const mockRequest = {
  id: 'REQ-2023-001',
  type: 'Acte de naissance',
  status: 'approved' as const,
  date: new Date(2023, 4, 15),
  lastUpdate: new Date(2023, 4, 17),
  details: {
    fullName: 'Konan Kouadio',
    birthDate: new Date(1990, 5, 12),
    birthPlace: 'Abidjan',
    fatherName: 'Konan Yao',
    motherName: 'Aka Marie',
    commune: 'Cocody',
    deliveryMethod: 'download',
    phoneNumber: '+225 0123456789',
  },
  timeline: [
    {
      id: 1,
      status: 'pending',
      date: new Date(2023, 4, 15, 9, 30),
      description: 'Demande soumise',
    },
    {
      id: 2,
      status: 'processing',
      date: new Date(2023, 4, 16, 10, 15),
      description: 'Demande en cours de traitement',
    },
    {
      id: 3,
      status: 'approved',
      date: new Date(2023, 4, 17, 14, 45),
      description: 'Demande approuvée',
    }
  ],
  payment: {
    amount: 3000,
    status: 'paid',
    date: new Date(2023, 4, 15, 10, 0),
    reference: 'PAY-2023-001'
  }
};

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState(mockRequest);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequest(mockRequest);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link 
            to="/citizen/requests" 
            className="flex items-center text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour aux demandes
          </Link>
          <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700"></div>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Référence: {request.id}</span>
        </div>
        {request.status === 'approved' && (
          <Button icon={<Download size={18} />}>
            Télécharger l'acte
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Status Card */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{request.type}</h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Soumise le {format(request.date, 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
              <RequestStatusBadge status={request.status} />
            </div>
          </Card>

          {/* Details */}
          <Card title="Informations de la demande">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 font-medium text-neutral-900 dark:text-white">Informations personnelles</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Nom complet</p>
                      <p className="font-medium text-neutral-900 dark:text-white">{request.details.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Date de naissance</p>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {format(request.details.birthDate, 'dd MMMM yyyy', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Lieu de naissance</p>
                      <p className="font-medium text-neutral-900 dark:text-white">{request.details.birthPlace}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-4 font-medium text-neutral-900 dark:text-white">Informations complémentaires</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Nom du père</p>
                      <p className="font-medium text-neutral-900 dark:text-white">{request.details.fatherName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Nom de la mère</p>
                      <p className="font-medium text-neutral-900 dark:text-white">{request.details.motherName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Téléphone</p>
                      <p className="font-medium text-neutral-900 dark:text-white">{request.details.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card title="Suivi de la demande">
            <div className="flow-root">
              <ul className="-mb-8">
                {request.timeline.map((event, eventIdx) => (
                  <li key={event.id}>
                    <div className="relative pb-8">
                      {eventIdx !== request.timeline.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-neutral-200 dark:bg-neutral-700"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            event.status === 'approved' 
                              ? 'bg-success-100 text-success-500 dark:bg-success-900/30 dark:text-success-400'
                              : event.status === 'processing'
                              ? 'bg-primary-100 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400'
                              : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                          }`}>
                            <Clock size={16} />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-neutral-900 dark:text-white">
                              {event.description}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-neutral-500 dark:text-neutral-400">
                            {format(event.date, 'dd MMM yyyy à HH:mm', { locale: fr })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Info */}
          <Card title="Informations de paiement">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Montant</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {request.payment.amount.toLocaleString('fr-CI')} FCFA
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Référence</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {request.payment.reference}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Date</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {format(request.payment.date, 'dd/MM/yyyy HH:mm', { locale: fr })}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Statut</span>
                <span className="inline-flex rounded-full bg-success-100 px-2 py-1 text-xs font-medium text-success-800 dark:bg-success-900/30 dark:text-success-400">
                  Payé
                </span>
              </div>
            </div>
          </Card>

          {/* Delivery Info */}
          <Card title="Mode de réception">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Méthode</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {request.details.deliveryMethod === 'download' ? 'Téléchargement' : 'Livraison'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Commune</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {request.details.commune}
                </span>
              </div>
              
              {request.details.deliveryMethod === 'delivery' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Adresse</span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {request.details.address}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Téléphone</span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {request.details.phoneNumber}
                    </span>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Help Card */}
          <Card>
            <div className="text-center">
              <h3 className="font-medium text-neutral-900 dark:text-white">Besoin d'aide ?</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Notre équipe est disponible pour vous aider
              </p>
              <Button 
                variant="outline" 
                fullWidth 
                className="mt-4"
              >
                Contacter le support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;