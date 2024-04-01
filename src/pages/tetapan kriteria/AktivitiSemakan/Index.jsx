import React from 'react';
import "../../../assets/styles/styles_tetapan_kriteria.css";
import SearchAktivitiSemakan from './Search';

function IndexAktivitSemakan() {
  return (
    <div>
      <div className='page-title'>
        <h2>Tetapan Aktiviti Semakan</h2>
        <hr />
        <h3>Tambah Aktiviti Semakan</h3>
      </div>

      <div className='page-content'>
        <SearchAktivitiSemakan/>
      </div>
    </div>
  )
}

export default IndexAktivitSemakan;
