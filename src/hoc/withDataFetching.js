import { useDataFetching } from "../hooks/useDataFetching";
import Loader from "../components/common/loader";
import { Button } from "reactstrap";

// Higher-Order Component (HOC)
const withDataFetching = (url) => (WrappedComponent) => {
  const WithDataFetching = (props) => {
    const { data, loading, error, handleRetry } = useDataFetching(url);

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
          <Button onClick={handleRetry}> Try Again </Button>
        </div>
      );
    }

    return <WrappedComponent data={data} {...props} />;
  };

  return WithDataFetching;
};

export default withDataFetching;
