// import { useSession, signIn, signOut } from "next-auth/react";
import { auth } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUsers, getTransactions, getTopTransactionsPerUser } from '@/lib/api';
import MyTopTransactions from "./my-top-transactions";
import TopUsers from "./top-users";
import DashboardMenu from "./dashboard-menu";
import { redirect } from "next/navigation";
import SetBreadcrumbs from "@/components/custom/set-breadcrumbs";
import MyTransactions from "./my-transactions";
import MyTransactionsAggregate from "./my-transactions-aggregate";

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; };
  }) {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }
  const accessToken = session?.accessToken ?? ''
  const search = searchParams.q ?? '';

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-6">
        <DashboardMenu></DashboardMenu>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <MyTransactionsAggregate></MyTransactionsAggregate>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <MyTopTransactions></MyTopTransactions>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <TopUsers></TopUsers>
      </div>
      <div className="col-span-12">
        <MyTransactions></MyTransactions>
      </div>
      <SetBreadcrumbs></SetBreadcrumbs>
      {/* <div className="col-span-6">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <div>
            {users.map((user: any) => (
              <div key={user.id}>
                <div>{user.username}</div>
                <div>{user.balance}</div>
              </div>
              )
            )}
          </div>
          <TabsContent value="all">
            <TransactionsTable></TransactionsTable>
          </TabsContent>
          
        </Tabs>
      </div> */}
    </div>
  );
}
