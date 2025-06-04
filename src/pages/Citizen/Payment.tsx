import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CreditCard, ArrowLeft, Check } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { toast } from 'react-toastify';

// Mock payment data
const mockPaymentDetails = {
  id: 'PAY-2023-001',
  requestId: 'REQ-2023-001',
  amount: 3000,
  description: 'Acte de naissance',
  status: 'pending'
};

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(mockPaymentDetails);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'mobile_money' | null>(null);

  useEffect(() => {
    // Simulate API call to fetch payment details
    setTimeout(() => {
      setPaymentDetails(mockPaymentDetails);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Veuillez sélectionner un mode de paiement');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Paiement effectué avec succès');
      navigate(`/citizen/requests/${id}`);
    } catch (error) {
      toast.error('Une erreur est survenue lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link 
          to={`/citizen/requests/${id}`}
          className="flex items-center text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
        >
          <ArrowLeft size={16} className="mr-1" />
          Retour à la demande
        </Link>
      </div>

      <Card>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Paiement</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Référence: {paymentDetails.id}
            </p>
          </div>

          <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Montant à payer</span>
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                {paymentDetails.amount.toLocaleString('fr-CI')} FCFA
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {paymentDetails.description}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium text-neutral-900 dark:text-white">Mode de paiement</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setSelectedMethod('mobile_money')}
                className={`flex flex-col items-center rounded-lg border p-4 transition-colors ${
                  selectedMethod === 'mobile_money'
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-500 dark:bg-primary-900/20'
                    : 'border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="mb-2 rounded-full bg-primary-100 p-3 text-primary-500 dark:bg-primary-900/30">
                  <CreditCard size={24} />
                </div>
                <h3 className="font-medium text-neutral-900 dark:text-white">Mobile Money</h3>
                <p className="mt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  Orange Money, MTN Money, Moov Money
                </p>
              </button>

              <button
                onClick={() => setSelectedMethod('card')}
                className={`flex flex-col items-center rounded-lg border p-4 transition-colors ${
                  selectedMethod === 'card'
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-500 dark:bg-primary-900/20'
                    : 'border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="mb-2 rounded-full bg-primary-100 p-3 text-primary-500 dark:bg-primary-900/30">
                  <CreditCard size={24} />
                </div>
                <h3 className="font-medium text-neutral-900 dark:text-white">Carte Bancaire</h3>
                <p className="mt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  Visa, Mastercard
                </p>
              </button>
            </div>
          </div>

          {selectedMethod === 'mobile_money' && (
            <div className="space-y-4">
              <Input
                label="Numéro de téléphone"
                placeholder="+225 XX XX XX XX XX"
                type="tel"
              />
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <Input
                label="Numéro de carte"
                placeholder="1234 5678 9012 3456"
                type="text"
              />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Date d'expiration"
                  placeholder="MM/YY"
                  type="text"
                />
                <Input
                  label="Code CVC"
                  placeholder="123"
                  type="text"
                />
              </div>
              
              <Input
                label="Nom sur la carte"
                placeholder="JOHN DOE"
                type="text"
              />
            </div>
          )}

          <Button
            onClick={handlePayment}
            isLoading={isProcessing}
            fullWidth
            icon={<Check size={18} />}
          >
            Payer {paymentDetails.amount.toLocaleString('fr-CI')} FCFA
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Payment;