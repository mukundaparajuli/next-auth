import Header from "./header";
import { BackButton } from "./back-button";
import { Card, CardHeader, CardFooter } from "../card";

const ErrorCard = () => {
  return (
    <div>
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <Header label="Something went wrong!" />
        </CardHeader>
        <CardFooter>
          <BackButton label="Back to Login" href="/auth/login" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorCard;
