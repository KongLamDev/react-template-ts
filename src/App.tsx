import { useEffect, useState } from "react";
import { TableExpenses } from "./components/TableExpenses";
import styled from "styled-components";

const apiURL = "https://expenses-backend-mu.vercel.app/expenses";

export type Data = {
  id: number;
  merchant: string;
  amount: number;
  description: string;
  date: string;
  category: "training" | "travel" | "meals";
  status: string;
};

const Header = styled.h1`
  border-bottom: 3px solid black;
`;

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL, {
          headers: {
            "Content-Type": "application/json",
            Username: "kong.lam", // <--- Make sure you change this
          },
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error);
        }
        const data = await response.json();
        setData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error has occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="template-text">
      <Header>Expenses</Header>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      <TableExpenses data={data} />
    </div>
  );
}

export default App;
