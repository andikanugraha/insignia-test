'use client'

import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useAppDispatch, useAppSelector } from "app/hooks";

const DashboardBreadcrumb = () => {
  const breadcrumbs = useAppSelector(state => state.user.breadcrumbs)
  // const dispatch = useAppDispatch()

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <>
            <BreadcrumbItem>
              {index < breadcrumbs.length - 1 &&
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.text}</Link>
                </BreadcrumbLink>
              }
              {index >= breadcrumbs.length - 1 &&
                <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>    
              }
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DashboardBreadcrumb
