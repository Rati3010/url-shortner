import React from 'react'
import { useParams } from 'react-router';
import { BarLoader } from 'react-spinners';
import useFetch from '@/hooks/useFetch';
import { getLongUrl } from '@/db/apiUrls';
import { storeClicks } from '@/db/apiClick';

const Redirect = () => {
  const {id} = useParams();

  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
}

export default Redirect