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

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
  }) {
  // const { data: session } = useSession();
  const session = await auth()
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  // const { products, newOffset, totalProducts } = await getProducts(
  //   search,
  //   Number(offset)
  // );
  const accessToken = session?.accessToken
  const users = await getUsers(search, Number(offset));
  console.log('users', users)
  console.log('session', session)
  const topTransactions = await getTopTransactionsPerUser(accessToken ?? '')
  // const transactions = await getTransactions()
  console.log('top transactions', topTransactions)

  return (
    <div className="grid grid-cols-12 space-x-4">
      <div className="col-span-6">
        <SessionProvider>
          <MyTopTransactions></MyTopTransactions>
        </SessionProvider>
      </div>
      <div className="col-span-6">
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
            {/* <TransactionsTable></TransactionsTable> */}
            {/* <ProductsTable
              products={products}
              offset={newOffset ?? 0}
              totalProducts={totalProducts}
            /> */}
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
}
