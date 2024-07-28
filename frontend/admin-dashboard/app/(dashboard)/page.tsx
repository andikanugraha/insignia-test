// import { useSession, signIn, signOut } from "next-auth/react";
import { auth, authOptions } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getProducts } from '@/lib/db';
import { getUsers, getTransactions, getTopTransactionsPerUser } from '@/lib/api';
import { TransactionsTable } from './transactions-table';
import MyTopTransactions from "./my-top-transactions";
import { SessionProvider } from "next-auth/react";
import TopUsers from "./top-users";
import DashboardMenu from "./dashboard-menu";
import { redirect } from "next/navigation";

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
  // console.log('session', session)

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <SessionProvider>
          <DashboardMenu></DashboardMenu>
        </SessionProvider>
      </div>
      <div className="col-span-12"></div>
      <div className="col-span-6">
        <SessionProvider>
          <MyTopTransactions></MyTopTransactions>
        </SessionProvider>
      </div>
      <div className="col-span-6">
        <SessionProvider>
          <TopUsers></TopUsers>
        </SessionProvider>
      </div>
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
