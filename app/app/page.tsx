'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logoFormula from '../public/formula.png';
import { Pagination } from "../components/ui/pagination";
import { Input } from "@/components/ui/input"
import { Search, Maximize2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TireCard from "../components/complex/TireCard"

interface Tire {
  brand: string
  model_id: string
  model: string
  url: string
  type: string
  size: string
  img: string
  price: number
}

const typeLabel: { [key: string]: string } = {
  passenger: 'Turismo',
  'light-truck': 'Camiones ligeros',
  specialty: 'Especializados',
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tireData, setTireData] = useState<Tire[]>([]);
  const [filteredTireData, setFilteredTireData] = useState<Tire[]>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [activeTab, setActiveTab] = useState("all")

    // Handle page change
    const handlePageChange = (page: number) => {
      setCurrentPage(page)
      // Scroll to top when changing pages
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  
    // Reset page when search query changes or tab changes
    useEffect(() => {
      setCurrentPage(1)
    }, [searchQuery, activeTab])
  

  useEffect(() => {
    import('../public/tire_sample').then((module) => {
      const data = module.default.filter((tire: any) => tire.size !== undefined) as Tire[];
      setTireData(data);
      setFilteredTireData(data);
    });
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTireData(tireData);
    } else {
      setFilteredTireData(tireData.filter((tire) => {
        return tire.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tire.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tire.size.toLowerCase().includes(searchQuery.toLowerCase());
      }));
    }
  }, [searchQuery, tireData]);

  // Group tires by model to avoid duplicates in the display
  const uniqueModels = Array.from(new Set(filteredTireData.map((tire) => tire.model_id))).map((modelId) => {
    const firstTire = tireData.find((tire) => tire.model_id === modelId)
    return {
      model_id: modelId,
      model: firstTire?.model || "",
      type: firstTire?.type || "",
      img: firstTire?.img || "",
      brand: firstTire?.brand || "",
      price: firstTire?.price || 0,
      url: firstTire?.url || "",
      size: "",
      offer: Math.random() > 0.7,
    }
  })

  // Get unique tire types for tabs
  const tireTypes = Array.from(new Set(tireData.map((tire) => tire.type)))
  console.log(tireTypes);

  return (
    <div>
      <nav className='flex items-center justify-between shadow-sm p-3 bg-white'>
        <div className='flex items-center'>
          <Image priority={true} src={logoFormula} alt="logo" className='w-24'/>
          <h1 className='text-xl sm:text-2xl font-semibold'><span className='inline'>|</span> Catálogo de neumáticos</h1>
        </div>
      </nav>
      <main className='p-5'>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Buscar por modelo, marca o medida..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className=" w-full" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid-cols-4 mb-8">
            <TabsTrigger value="all">Todas</TabsTrigger>
            {tireTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {typeLabel[type] || type} 
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            {
              uniqueModels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                  uniqueModels
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((tire) => (
                    <TireCard key={tire.model_id} {...tire} tireData={filteredTireData} />
                    ))
                }
              </div>  
              ) : (
                <div className="text-center py-10">
                  <p className="text-lg text-muted-foreground">
                    No se encontraron neumáticos que coincidan con tu búsqueda.
                  </p>
                </div>
              )
            }
            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
              <Pagination
                totalItems={uniqueModels.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </TabsContent>
          {tireTypes.map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              {
                uniqueModels.filter((tire) => tire.type === type).length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                  {
                    uniqueModels
                      .filter((tire) => tire.type === type)
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((tire) => (
                        <TireCard key={tire.model_id} {...tire} tireData={filteredTireData} />
                      ))  
                  }
                </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-lg text-muted-foreground">
                      No se encontraron neumáticos que coincidan con tu búsqueda.
                    </p>
                  </div>
                )
              }

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
              <Pagination
                totalItems={uniqueModels.filter((tire) => tire.type === type).length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>

            </TabsContent>
          ))}


        </Tabs>

      </main>
    </div>
  );
}
