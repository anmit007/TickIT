import { useState } from 'react';
import useRequest from '../hooks/use-request';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: (ticket) => console.log(ticket),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={onSubmit} className="my-5">
            <h1 className="text-center mb-4">Create a Ticket</h1>
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Enter the ticket title"
                style={{ backgroundColor: '#f8f9fa', color: '#495057' }}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                value={price}
                onBlur={onBlur}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                placeholder="Enter the ticket price"
                style={{ backgroundColor: '#f8f9fa', color: '#495057' }}
              />
            </div>
            {errors && <div className="alert alert-danger">{errors}</div>}
            <div className="text-center">
              <button
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(to right, #020024, #0c0cd2, #00d4ff)',
                  border: 'none',
                  color: '#ffffff',
                  width: '150px',
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
