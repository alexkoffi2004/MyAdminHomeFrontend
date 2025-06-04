import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  MapPin,
} from 'lucide-react';
import { Card } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

// Types
interface RequestDetails {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  priority: 'normal' | 'urgent';
  commune: string;
  documents: {
    name: string;
    status: 'required' | 'provided' | 'missing';
  }[];
  notes: string;
  history: {
    date: string;
    action: string;
    user: string;
  }[];
}

const ProcessRequest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState<RequestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // Simuler un chargement depuis l'API
    setTimeout(() => {
      setRequest({
        id: id || 'REQ-2023-001',
        name: 'Konan Kouadio',
        type: 'Acte de naissance',
        date: '2024-03-20',
        status: 'pending',
        priority: 'urgent',
        commune: 'Cocody',
        documents: [
          { name: 'Copie CNI', status: 'provided' },
          { name: 'Justificatif de domicile', status: 'provided' },
          { name: 'Formulaire de demande', status: 'missing' },
        ],
        notes: 'Le demandeur a fourni tous les documents nécessaires sauf le formulaire de demande qui doit être rempli.',
        history: [
          {
            date: '2024-03-20 09:00',
            action: 'Demande créée',
            user: 'Système',
          },
          {
            date: '2024-03-20 09:30',
            action: 'Documents reçus',
            user: 'Marie Koffi',
          },
        ],
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const handleProcess = async () => {
    if (!decision) return;
    
    setProcessing(true);
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mettre à jour l'historique
    if (request) {
      const newHistory = [
        ...request.history,
        {
          date: new Date().toISOString(),
          action: decision === 'approve' ? 'Demande approuvée' : 'Demande rejetée',
          user: `${user?.firstName} ${user?.lastName}`,
        },
      ];
      
      setRequest({
        ...request,
        status: decision === 'approve' ? 'completed' : 'rejected',
        history: newHistory,
      });
    }
    
    setProcessing(false);
    navigate('/agent/requests');
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400">Chargement de la demande...</p>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400">Demande non trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/agent/requests')}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Traitement de la demande {request.id}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {request.type} - {request.name}
          </p>
        </div>
        {request.priority === 'urgent' && (
          <span className="inline-flex rounded-full bg-error-100 px-3 py-1 text-sm font-medium text-error-800 dark:bg-error-900/30 dark:text-error-400">
            <AlertTriangle className="mr-1 h-4 w-4" />
            Urgent
          </span>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Informations de la demande">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <User className="mt-1 h-4 w-4 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Demandeur</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{request.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="mt-1 h-4 w-4 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Type de document</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{request.type}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-1 h-4 w-4 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Date de demande</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{request.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Commune</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{request.commune}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Documents requis">
            <div className="space-y-4">
              {request.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-700"
                >
                  <span className="text-sm text-neutral-900 dark:text-white">{doc.name}</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      doc.status === 'provided'
                        ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400'
                        : doc.status === 'missing'
                        ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400'
                        : 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400'
                    }`}
                  >
                    {doc.status === 'provided'
                      ? 'Fourni'
                      : doc.status === 'missing'
                      ? 'Manquant'
                      : 'Requis'}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Notes">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{request.notes}</p>
          </Card>
        </div>

        {/* Actions et historique */}
        <div className="space-y-6">
          <Card title="Actions">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Button
                  variant={decision === 'approve' ? 'primary' : 'outline'}
                  onClick={() => setDecision('approve')}
                  disabled={processing || request.status !== 'pending'}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approuver la demande
                </Button>
                <Button
                  variant={decision === 'reject' ? 'danger' : 'outline'}
                  onClick={() => setDecision('reject')}
                  disabled={processing || request.status !== 'pending'}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Rejeter la demande
                </Button>
              </div>

              {decision === 'reject' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Motif du rejet
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Entrez le motif du rejet..."
                  />
                </div>
              )}

              {decision && (
                <Button
                  className="w-full"
                  onClick={handleProcess}
                  disabled={processing || (decision === 'reject' && !rejectionReason)}
                >
                  {processing ? 'Traitement en cours...' : 'Confirmer'}
                </Button>
              )}
            </div>
          </Card>

          <Card title="Historique">
            <div className="space-y-4">
              {request.history.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {event.action}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {event.date} par {event.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProcessRequest; 