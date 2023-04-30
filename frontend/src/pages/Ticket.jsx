import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicket } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
  const { ticket } = useSelector((state) => state.tickets);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error);
  }, [ticketId, dispatch]);

  if (!ticket) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>Ticket ID: {ticket._id}</h2>
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-GB')}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
};

export default Ticket;
