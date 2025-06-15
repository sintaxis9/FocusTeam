import { useEffect, useState } from 'react';
import { getCompanies } from '../services/companyService';

export function useCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies()
      .then(data => setCompanies(data.companies))
      .finally(() => setLoading(false));
  }, []);

  return { companies, loading };
}
