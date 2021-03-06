import React, { Component } from 'react'
import ErrorBoundary from '../../components/ErrorBoundary'
// import UserNameData from './UserNameData'
import EthAddress from '../../components/EthAddress'
import PropTypes from 'prop-types'

class Search extends Component {
  constructor (props, context) {
    super(props, context)
    this.drizzle = this.context.drizzle
    this.web3 = this.props.web3
    this.contracts = this.props.contracts
    this.fileArray = []
    this.state = {
      lastIds: 0,
      table: [],
      fileOwnerAddress: this.props.fileOwnerAddress
    }
  }

  // need to add redux react router
  componentDidMount () {
    // console.log(this.drizzle)
    // don't need to add to store, just link to other FileTables.
    /**
    this.drizzle.contracts.Identity.methods.allUsers().call()
    .then((allUsers) => {
      this.setState({
         allUsers: allUsers
      });
    })
    */
  }
  render () {
    // add to componentDidMount
    let allUsers = []
    let allUsersKey
    // Check that the contract is actually initialized
    if (this.drizzle.contracts.Identity &&
        this.props.contracts.Identity &&
        this.props.contracts.Identity.initialized
    ) {
      // just find the first ten users
      for (let i = 0; i < 10; i++) {
        // Get dataKeys for cache access
        allUsersKey = this.drizzle.contracts.Identity.methods.allUsers.cacheCall(i)
        // Check that the data is cached
        if (this.props.contracts.Identity.allUsers[allUsersKey]
        ) {
          if (this.props.contracts.Identity.allUsers[allUsersKey].value !== undefined) {
            let userAddress = this.props.contracts.Identity.allUsers[allUsersKey].value
            allUsers.push(userAddress)
          } else {
            break
          }
        }
      }
    }
    return (
      <ErrorBoundary>
        <div className='container'>
          <h4>Registered Accounts </h4>
          <ul>
            {
              allUsers.map((userAddress) =>
                <li>
                  <EthAddress
                    address={userAddress}
                    copyToClipboard
                  />
                  <a href={`../users/${userAddress}`} >See Files</a>
                </li>
              )
            }
          </ul>
        </div>
      </ErrorBoundary>
    )
  }
}

Search.contextTypes = {
  drizzle: PropTypes.object
}
export default Search
