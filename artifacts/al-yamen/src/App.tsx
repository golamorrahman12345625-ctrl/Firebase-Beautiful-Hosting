import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import AddTransaction from "@/pages/AddTransaction";
import AllTransactions from "@/pages/AllTransactions";
import RecentTransactions from "@/pages/RecentTransactions";
import NewOrder from "@/pages/NewOrder";
import OrderHistory from "@/pages/OrderHistory";
import CustomerList from "@/pages/CustomerList";
import AddProduct from "@/pages/AddProduct";
import StockList from "@/pages/StockList";
import Categories from "@/pages/Categories";
import HRManagement from "@/pages/HRManagement";
import Accounting from "@/pages/Accounting";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/transactions/add" component={AddTransaction} />
        <Route path="/transactions/all" component={AllTransactions} />
        <Route path="/transactions/recent" component={RecentTransactions} />
        <Route path="/sales/new-order" component={NewOrder} />
        <Route path="/sales/order-history" component={OrderHistory} />
        <Route path="/sales/customers" component={CustomerList} />
        <Route path="/inventory/add-product" component={AddProduct} />
        <Route path="/inventory/stock-list" component={StockList} />
        <Route path="/inventory/categories" component={Categories} />
        <Route path="/hr" component={HRManagement} />
        <Route path="/accounting" component={Accounting} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
