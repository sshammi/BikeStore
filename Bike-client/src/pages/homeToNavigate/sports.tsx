import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUpcommingBikesQuery } from '@/redux/features/auth/authApi';

const Sports = () => {
  const navigate = useNavigate();
  const { data: trendingResponse, isLoading } = useGetUpcommingBikesQuery({});
  const allBikes = trendingResponse?.data || [];

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allBikes.length / itemsPerPage);

  const paginatedBikes = allBikes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-6 mx-[10%]">
      <h2 className="text-3xl font-bold mb-8 mt-20 text-center">Sports</h2>

      {isLoading ? (
        <p className="text-center"><Skeleton className="w-[100px] h-[20px] rounded-full" /></p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBikes.map((bike) => (
              <Card key={bike._id} className="flex flex-col justify-between overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-56 object-cover mb-4"
                  />
                  <div className="bg-[#F9F9F9]">
                    <h4 className="text-lg font-bold pt-5 px-4">{bike.name}</h4>
                    <p className="font-semibold text-md px-4 text-gray-700">
                      BDT {bike.price}
                    </p>
                    <p className="text-sm text-gray-600 px-4 py-2">
                      Discover unmatched performance and comfort with the {bike.name}, perfect for urban and off-road rides alike.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        className="w-2/3 border border-[#00857A] bg-white hover:bg-gray-50 text-[#00857A] my-4 rounded-xl"
                        onClick={() => navigate(`/product-details/${bike._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination UI */}
          {totalPages > 1 && (
            <Pagination className="mt-10 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                <PaginationItem className="flex items-center px-4 font-medium">
                  Page {page} of {totalPages}
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Sports;
