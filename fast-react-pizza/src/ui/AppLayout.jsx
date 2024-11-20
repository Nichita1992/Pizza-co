import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/Cart/CartOverview";
import Header from "./Header";
import Loading from "./Loading";

function AppLayout() {
  const navigation = useNavigation();
  const { state: isLoading } = navigation;
  const loadingStatus = isLoading === "loading";

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {loadingStatus && <Loading />}

      <Header />

      <main className="grid overflow-y-auto">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
