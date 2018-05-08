import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import 'whatwg-fetch';
import ReactTable from 'react-table'
import *  as AccountService from './AccountService'
import Modal from 'react-modal';

var moment = require('moment');
Modal.setAppElement('#root');

class App extends Component {

  constructor() {
    super();

    this.state = {
      accounts: null,
      error: false,
      currentAccount: null,
      showModal: false,
      context: 'allAccounts'
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addAccount= this.addAccount.bind(this);
    this.updateAccount = this.updateAccount.bind(this);

  }

  componentDidMount() {
    this.refreshAllAccounts()
  }

  refreshAllAccounts() {
    this.setState({error: false})

    return AccountService.getAllAccounts()
        .then(data => this.setState({accounts: data}))
        .catch(error => { this.setState({error: true})});

  }
  openModal(context) {
    this.setState({showModal: true, context, error: false});
  }

  closeModal() {
    this.setState({showModal: false, context: 'allAccounts', currentAccount: null, error: false});
  }

  getColumns() {
    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Email',
      accessor: 'email',
    }, {
      Header: 'Date of Birth',
      accessor: 'dob',
      Cell: props => <span>{moment.utc(props.value).format('MMMM Do YYYY')}</span>
    }]

    return columns
  }

  addAccount(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    AccountService.addAccount({
      name: data.get('name'),
      email: data.get('email'),
      dob: data.get('dob')
    })
    .then(() => {
      this.refreshAllAccounts()
      this.closeModal()
    })
    .catch(() => {
      this.setState({error: true})
    })
  }

  addAccountView() {
    return (
        <Modal
            isOpen={this.state.showModal}
            onRequestClose={() => this.closeModal}
            contentLabel="Add account"
            style={modalStyle}
        >
          <div>
            <button onClick={this.closeModal} className="pull-right btn-xs btn btn-danger">
              <span className={"glyphicon glyphicon-remove"}></span>
            </button>

            <div className="row" style={{padding: 30}}>
              <form className="form-horizontal" onSubmit={this.addAccount}>

                <div className="form-group">
                    <label for="name">Full Name</label>
                    <input id="name" name="name" type="text" placeholder="Full Name" className="input-large form-control" required/>
                  </div>


                <div className="form-group">
                  <label for="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="Email" className="input-large form-control" required/>
                </div>


                <div className="form-group">
                  <label for="dob">Date of Birth</label>
                  <input type="date" size="16" className="input-large form-control" id="dob" name="dob" required/>
                </div>

                <button type="submit" className="btn btn-primary">Add</button>

              </form>

            </div>
          </div>
        </Modal>
    )
  }

  updateAccount(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    AccountService.updateAccount(this.state.currentAccount.id, {
      name: data.get('name'),
      email: data.get('email'),
      dob: data.get('dob')
    })
    .then(() => {
      this.refreshAllAccounts()
      this.closeModal()
    })
    .catch(() => {
      this.setState({error: true})
    })
  }

  updateAccountView() {
    return (
        <Modal
            isOpen={this.state.showModal}
            onRequestClose={() => this.closeModal}
            contentLabel="Update account"
            style={modalStyle}
        >
          <div>
            <button onClick={this.closeModal} className="pull-right btn-xs btn btn-danger">
              <span className={"glyphicon glyphicon-remove"}></span>
            </button>

            <div className="row" style={{padding: 30}}>
              <form className="form-horizontal" onSubmit={this.updateAccount}>

                <div className="form-group">
                  <label for="name">Full Name</label>
                  <input id="name" name="name" defaultValue={this.state.currentAccount.name} type="text" placeholder="Full Name" className="input-large form-control" required/>
                </div>


                <div className="form-group">
                  <label for="email">Email</label>
                  <input id="email" name="email" defaultValue={this.state.currentAccount.email} type="email" placeholder="Email" className="input-large form-control" required/>
                </div>


                <div className="form-group">
                  <label for="dob">Date of Birth</label>
                  <input type="date" size="16" defaultValue={moment.utc(this.state.currentAccount.dob).format('YYYY-MM-DD')} className="input-large form-control" id="dob" name="dob" required/>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>

              </form>

            </div>
          </div>
        </Modal>
    )
  }

  allAccountsView() {
    return (
        <div style={{marginTop: 60}}>

          <div style={{paddingTop: 20, paddingBottom: 20}}>
            <button type="button" className={"btn btn-primary"} onClick={() => this.openModal('add')}>
              <span className={"glyphicon glyphicon-plus"}></span> Add Account
            </button>
          </div>

          <ReactTable
              data={this.state.accounts}
              columns={this.getColumns()}
              defaultPageSize={10}
              className="-striped -highlight"
              showPagination={true}
              SubComponent={ row => {
              return (
                <div style={{margin: 30}}>
                  <button type="button" style={{marginRight: 20}} className={"btn btn-info"} onClick={() => {

                    this.setState({error: false})
                    AccountService.getAccount(row.original.id)
                    .then(account => {
                      this.setState({currentAccount: account})
                      this.openModal('update')
                    })
                    .catch(() => {
                      this.setState({error: true})
                    });

                  }}>
                    <span className={"glyphicon glyphicon-pencil"}></span> Update Account
                  </button>

                  <button type="button" style={{marginRight: 20}} className={"btn btn-danger"} onClick={() => {

                    this.setState({error: false})
                    AccountService.deleteAccount(row.original.id)
                    .then(account => {
                      //sync with backend
                      this.refreshAllAccounts()
                    })
                    .catch(() => {
                      this.setState({error: true})
                    });

                  }}>
                    <span className={"glyphicon glyphicon-remove"}></span> Delete Account
                  </button>
                </div>
              )
            }}
          />
        </div>
    )
  }

  getContent() {
    if (this.state.context === 'allAccounts')
      return this.allAccountsView()

    if (this.state.showModal) {
      if (this.state.context === 'add')
          return this.addAccountView()

        if (this.state.context === 'update')
      return this.updateAccountView()
    }
  }

  render() {

    let content = this.state.accounts ?  this.getContent() : (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> Loading ... </div>
    )

    let error = this.state.error ? (
        <div className="alert alert-danger" role="alert">
          Error while making an API call :(
        </div>
    ) : null

    return (
        <div style={{marginTop: 60}}>
          {error}
          {content}
        </div>
    )
  }
}

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default App;
