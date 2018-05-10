import React from 'react';
import LeftNavigation from './LeftNav';
import axios from 'axios';
import './Stat.css';
class StatsPage extends React.Component {
  state = {
    customers: []
  };

  async componentDidMount() {
    axios
      .get('/geturls')
      .then(res => console.log(res))
      .catch(err => console.log(err));

    const sessionCookie = await localStorage.getItem('sessionCookie');
    const email = await localStorage.getItem('email');
    if (!sessionCookie) {
      this.props.history.push('/signup');
      return;
    }
    axios
      .post(`/get-customers`, { email })
      .then(response => {
        const customers = Object.entries(response.data.customers);
        this.setState({ customers: [...customers] });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="page">
        <div>
          <LeftNavigation />
        </div>
        <div className="content"
             style={{
                 display: 'flex',
                 flexDirection:'row',
                 justifyContent: 'space-around',


             }}>
            <div className = "left"><h1>Track your reviews and improve customer service.</h1>
            Know when customers follow the link to leave you a review! This area will advise you when an invitation you have sent is opened!
            </div>
            <div className="statBox">
          {this.state.customers.map(customer => {
            return (
              <div key={customer[0]}>
                <div>{`${customer[1].firstName} ${customer[1].lastName} ${
                  customer[1].clickedLink
                    ? 'clicked your review link!'
                    : 'has not clicked your review link yet!'
                }`}</div>
              </div>
            );
          })}
            </div>
        </div>
      </div>
    );
  }
}

export default StatsPage;
