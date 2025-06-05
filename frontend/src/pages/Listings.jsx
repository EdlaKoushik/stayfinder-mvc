import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire, faBed, faMountainCity, faMountain, faFortAwesome,
  faPersonSwimming, faCampground, faCow, faSnowflake, faIgloo, faShip
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import '../styles/Listings.css';

const FILTERS = [
  { label: 'Trending', icon: faFire },
  { label: 'Rooms', icon: faBed },
  { label: 'Iconic Cities', icon: faMountainCity },
  { label: 'Mountains', icon: faMountain },
  { label: 'Castles', icon: faFortAwesome },
  { label: 'Amazing Pools', icon: faPersonSwimming },
  { label: 'Camping', icon: faCampground },
  { label: 'Farms', icon: faCow },
  { label: 'Arctic', icon: faSnowflake },
  { label: 'Domes', icon: faIgloo },
  { label: 'Boats', icon: faShip }
];

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [showTax, setShowTax] = useState(false);
  const { user } = useAuth();

  const searchVal = searchParams.get('search') || '';
  const filterVal = searchParams.get('filter') || '';

  useEffect(() => {
    fetchListings();
  }, [searchVal, filterVal]);

  const fetchListings = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchVal) queryParams.append('search', searchVal);
      if (filterVal) queryParams.append('filter', filterVal);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/listings?${queryParams}`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchValue = formData.get('search');
    setSearchParams({ search: searchValue, filter: filterVal });
  };

  const handleFilterClick = (filter) => {
    setSearchParams({ search: searchVal, filter: filter });
  };

  const handleTaxToggle = () => {
    setShowTax(!showTax);
  };

  return (
    <div className="container mt-3">
      {user && (
        <div className="tax-toggle-page">
          <div className="form-check-reverse form-switch">
            <label className="form-check-label" htmlFor="flexSwitchCheckDefaultPage">
              Display total after taxes
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefaultPage"
              onChange={handleTaxToggle}
              checked={showTax}
            />
          </div>
        </div>
      )}

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          className="search-inp"
          placeholder="Search listings..."
          defaultValue={searchVal}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div id="filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.label}
            className={`filter${filterVal === filter.label ? ' active' : ''}`}
            onClick={() => handleFilterClick(filter.label)}
          >
            <div>
              <FontAwesomeIcon icon={filter.icon} />
            </div>
            <p>{filter.label}</p>
          </button>
        ))}
      </div>

      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
        {listings.map((listing) => (
          <Link
            key={listing._id}
            to={`/listings/${listing._id}`}
            className="listing-link"
          >
            <div className="card col listing-card">
              <img
                src={listing.image.url}
                className="card-img-top"
                alt={listing.title}
              />
              <div className="card-img-overlay"></div>
              <div className="card-body">
                <p className="card-text">
                  <b>{listing.title}</b>
                  <br />
                  ₹{listing.price?.toLocaleString("en-IN") || "N/A"} /night
                  <span
                    className="tax-info"
                    style={{ display: showTax ? 'inline' : 'none' }}
                  >
                    &nbsp;&nbsp;+18%GST
                  </span>
                  <br />
                  <span style={{ color: '#888', fontSize: '0.95em' }}>
                    {listing.location}, {listing.country}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listings; 