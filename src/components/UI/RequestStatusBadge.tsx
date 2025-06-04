import Badge from './Badge';

export type RequestStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'paid' | 'delivered';

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

const RequestStatusBadge = ({ status }: RequestStatusBadgeProps) => {
  switch (status) {
    case 'pending':
      return <Badge variant="warning">En attente</Badge>;
    case 'processing':
      return <Badge variant="primary">En traitement</Badge>;
    case 'approved':
      return <Badge variant="success">Approuvée</Badge>;
    case 'rejected':
      return <Badge variant="danger">Rejetée</Badge>;
    case 'paid':
      return <Badge variant="info">Payée</Badge>;
    case 'delivered':
      return <Badge variant="secondary">Délivrée</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

export default RequestStatusBadge;