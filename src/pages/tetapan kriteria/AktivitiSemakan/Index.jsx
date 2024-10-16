import React from 'react';
import "../../../assets/styles/styles_tetapan_kriteria.css";
import ShowAktivitiSemakanList from './Show';

function IndexAktivitSemakan() {
  return (
    <div>
      <div className='page-title'>
        <h2>Activitiy Reviews</h2>
        <hr />
        <h3>Search Activity Reviews</h3>
      </div>

      <div className='page-content'>
        <ShowAktivitiSemakanList/>
      </div>
    </div>
  )
}

export default IndexAktivitSemakan;
