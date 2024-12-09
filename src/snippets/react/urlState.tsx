import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const fetchStuff = async (queryKey: string): Promise<Response> => {
  const res = await fetch(`/api/v1/stuff?search=${queryKey}`);
  const data = await res.json();
  return data;
};

// Custom hook ************************************************
function useSearchData(search: string) {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchStuff(search);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return { data, loading };
}

// Page component ************************************************
function UrlStatePage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  // Update search state from URL params on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const searchParam = params.get("search") || "";
    setSearch(searchParam);
  }, []);

  // Use the custom hook for fetching data
  const { data, loading } = useSearchData(search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    // Update the URL to reflect the new search
    if (newSearch) {
      router.push(`/?search=${newSearch}`, undefined, { shallow: true });
    } else {
      router.push(`/`, undefined, { shallow: true });
    }
  };

  return (
    <>
      <input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search"
      />
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}

export default UrlStatePage;
