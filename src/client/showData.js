import React, { Component } from 'react';
import auth0Client from './Auth';

export default class ShowData extends Component {
  constructor(props) {
    super(props);
    this.selectBeach = this.selectBeach.bind(this);
  }

  state = { beaches: [], selectedBeach: null };

  componentDidMount() {
    auth0Client.handleAuthentication(this.props).then(
      () => {
        fetch('https://api.coastal.ca.gov/access/v1/locations')
          .then(res => res.json())
          .then(data => this.setState({ beaches: data }));
      }
    );
  }

  static renderDataUnits(beaches) {
    return beaches.map((data, i) => {
      if (i < 10) {
        return (
          <li id={i} className="beach-list">
            { beaches[i].Photo_1 && <img src={beaches[i].Photo_1} width="100" height="100" alt={beaches[i].NameMobileWeb} data-id={i} />}
            { !beaches[i].Photo_1 && <h5 data-id={i}>Sorry,Image Not Available</h5>}
            <h4>{beaches[i].NameMobileWeb}</h4>
          </li>
        );
      }
    });
  }

  selectBeach(e) {
    const { beaches } = this.state;
    const index = e.target.getAttribute('data-id');
    if (index) {
      this.setState({ selectedBeach: beaches[index] });
    }
  }

  render() {
    const { beaches, selectedBeach } = this.state;
    return (
      <React.Fragment>
        {beaches.length ? <h1>{`Total Beaches in U.S. ${beaches.length}`}</h1> : <h1>Diving into Sea...</h1>}
        <div className="beach-display">
          <ul className="beach-list-wrapper" onClick={this.selectBeach} className="left-block">
            {ShowData.renderDataUnits(beaches)}
          </ul>
          { selectedBeach &&
           (
           <div className="right-block">
             <img src={selectedBeach.Photo_1} width="150" height="150" alt={selectedBeach.NameMobileWeb} />
             <span>{selectedBeach.DescriptionMobileWeb}</span>
             <ul>
               <li>{`Address: ${selectedBeach.LocationMobileWeb}`}</li>
               <li>{`County: ${selectedBeach.COUNTY}`}</li>
               <li>{`Entry FEE: ${selectedBeach.FEE}`}</li>
               <li>{`Contact: ${selectedBeach.PHONE_NMBR}`}</li>
             </ul>
           </div>
           )
          }
        </div>
      </React.Fragment>
    );
  }
}
